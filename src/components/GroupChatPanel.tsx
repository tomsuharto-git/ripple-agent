'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  personas,
  suggestedQuestions,
  getPersonaById,
  generateMessageId,
  type Persona,
  type GroupMessage,
  type APIMessage,
} from '@/data/group-chat';
import { askGroup, askPersona, toAPIHistory } from '@/lib/focus-group-api';

/**
 * GROUP CHAT PANEL
 *
 * Simulated focus group chat with XRP Army personas.
 * Toggle personas on/off to control who responds.
 * - All 3 selected: AI decides who responds (2-4 people)
 * - 1-2 selected: Only those personas respond
 */

// Persona color accent styles
const personaColors: Record<number, string> = {
  1: '#F59E0B', // Derek - Amber
  2: '#10B981', // Marcus - Green
  3: '#8B5CF6', // Jasmine - Purple
};

interface GroupChatPanelProps {
  /** Start with specific personas selected */
  initialPersonaIds?: number[];
}

export function GroupChatPanel({ initialPersonaIds }: GroupChatPanelProps) {
  // Core state
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [history, setHistory] = useState<APIMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Selection state - default all personas selected
  const [selectedIds, setSelectedIds] = useState<number[]>(
    initialPersonaIds || personas.map((p) => p.id)
  );

  // UI state
  const [typingPersonas, setTypingPersonas] = useState<number[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingPersonas, scrollToBottom]);

  // Toggle persona selection
  const handlePersonaToggle = useCallback((personaId: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(personaId)) {
        // Don't allow deselecting if it's the last one
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== personaId);
      } else {
        return [...prev, personaId];
      }
    });
  }, []);

  // Staggered reveal of persona responses
  const revealResponsesStaggered = useCallback(
    async (
      responses: Array<{ persona_id: number; persona_name: string; text: string }>,
      newHistory: APIMessage[]
    ) => {
      // Update history immediately
      setHistory(newHistory);

      // Reveal each response with a delay
      for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const persona = getPersonaById(response.persona_id);

        // Short delay between messages
        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 600));
        }

        // Add typing indicator for this persona
        setTypingPersonas((prev) => [...prev, response.persona_id]);

        // Simulate typing time (proportional to message length, 30-80ms per char)
        const typingTime = Math.min(Math.max(response.text.length * 30, 800), 2500);
        await new Promise((resolve) => setTimeout(resolve, typingTime));

        // Remove typing indicator and add message
        setTypingPersonas((prev) => prev.filter((id) => id !== response.persona_id));
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            type: 'persona',
            content: response.text,
            timestamp: new Date(),
            persona: persona || undefined,
          },
        ]);
      }
    },
    []
  );

  // Submit question to API
  const submitQuestion = useCallback(
    async (question: string) => {
      if (!question.trim() || isLoading) return;

      const userMessage = question.trim();
      setInput('');
      setIsLoading(true);

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          type: 'user',
          content: userMessage,
          timestamp: new Date(),
        },
      ]);

      // Convert to API history format
      const apiHistory = toAPIHistory(messages);

      try {
        // Determine who should respond based on selection
        const allSelected = selectedIds.length === personas.length;

        if (allSelected) {
          // All personas selected - let AI decide who responds
          const randomPersonas = personas
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 2) + 2)
            .map((p) => p.id);
          setTypingPersonas(randomPersonas);

          const response = await askGroup(userMessage, apiHistory);
          setTypingPersonas([]);
          await revealResponsesStaggered(response.responses, response.history);
        } else if (selectedIds.length === 1) {
          // Single persona selected
          setTypingPersonas(selectedIds);
          const response = await askPersona(selectedIds[0], userMessage, apiHistory);
          setTypingPersonas([]);
          await revealResponsesStaggered(response.responses, response.history);
        } else {
          // Multiple (but not all) personas selected - each responds
          setTypingPersonas(selectedIds);

          const allResponses: Array<{ persona_id: number; persona_name: string; text: string }> = [];
          let latestHistory = apiHistory;

          for (const personaId of selectedIds) {
            const response = await askPersona(personaId, userMessage, latestHistory);
            allResponses.push(...response.responses);
            latestHistory = response.history;
          }

          setTypingPersonas([]);
          await revealResponsesStaggered(allResponses, latestHistory);
        }
      } catch (error) {
        console.error('Group chat error:', error);
        setTypingPersonas([]);
        const fallbackPersona = getPersonaById(selectedIds[0]) || personas[0];
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            type: 'persona',
            content:
              "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
            timestamp: new Date(),
            persona: fallbackPersona,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, selectedIds, revealResponsesStaggered]
  );

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestion(input);
  };

  // Handle suggestion click
  const handleSuggestionClick = (questionText: string) => {
    if (isLoading) return;
    submitQuestion(questionText);
  };

  // Determine if we show welcome state
  const showWelcome = messages.length === 0 && !isLoading;

  // Get selected persona names for header
  const getHeaderText = () => {
    if (selectedIds.length === personas.length) {
      return 'XRP Army Focus Group';
    }
    const names = selectedIds
      .map((id) => getPersonaById(id)?.name.split(' ')[0])
      .filter(Boolean);
    return names.join(' & ');
  };

  const getSubheaderText = () => {
    if (selectedIds.length === personas.length) {
      return 'Click avatars to filter who responds';
    }
    if (selectedIds.length === 1) {
      const persona = getPersonaById(selectedIds[0]);
      return persona ? `${persona.shortTitle} • ${persona.occupation}` : '';
    }
    return `${selectedIds.length} of 3 selected`;
  };

  return (
    <div className="min-h-screen bg-gradient-page flex flex-col">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-light)' }}
            >
              {getHeaderText()}
            </h2>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
              {getSubheaderText()}
            </p>
          </div>
        </div>
        <div
          className="text-xs px-3 py-1 rounded-full"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--color-muted)' }}
        >
          {selectedIds.length === personas.length ? 'All' : selectedIds.length} active
        </div>
      </div>

      {/* Persona Bar - Toggle Selection */}
      <div
        className="flex justify-center gap-6 py-4 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        {personas.map((persona) => {
          const isSelected = selectedIds.includes(persona.id);
          const color = personaColors[persona.id];
          const isTyping = typingPersonas.includes(persona.id);

          return (
            <button
              key={persona.id}
              onClick={() => handlePersonaToggle(persona.id)}
              className={`flex flex-col items-center gap-2 group transition-all duration-200 ${
                isSelected ? 'scale-105' : 'opacity-40 hover:opacity-70'
              }`}
              disabled={isLoading}
              title={isSelected ? 'Click to remove from conversation' : 'Click to add to conversation'}
            >
              <div className="relative">
                <div
                  className={`w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ${
                    isTyping ? 'animate-pulse-glow' : ''
                  }`}
                  style={{
                    border: isSelected ? `3px solid ${color}` : '3px solid rgba(255,255,255,0.2)',
                    boxShadow: isSelected ? `0 0 20px ${color}40` : 'none',
                    filter: isSelected ? 'none' : 'grayscale(50%)',
                  }}
                >
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator - green if selected, gray if not */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: isSelected ? color : 'rgba(255,255,255,0.3)',
                    borderColor: 'var(--color-dark)',
                  }}
                />
              </div>
              <div className="text-center">
                <p
                  className="text-xs font-medium transition-colors"
                  style={{ color: isSelected ? color : 'var(--color-muted)' }}
                >
                  {persona.name.split(' ')[0]}
                </p>
                <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
                  {persona.shortTitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-4 max-w-3xl mx-auto">
          {/* Welcome State */}
          {showWelcome && (
            <div className="py-8 px-4 animate-fadeIn">
              <div className="text-center mb-8">
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center animate-pulse-glow"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg mb-2 font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-light)' }}
                >
                  Meet the XRP Army
                </h3>
                <p className="text-sm mb-1" style={{ color: 'var(--color-muted)' }}>
                  Three passionate community members are here to share their perspectives.
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  Click avatars above to choose who responds
                </p>
              </div>

              {/* Suggested Questions */}
              <div className="grid gap-2 max-w-md mx-auto">
                {suggestedQuestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] group"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      animationDelay: `${index * 0.05}s`,
                    }}
                    disabled={isLoading}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(0, 150, 228, 0.2)',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <p className="flex-1 text-sm" style={{ color: 'var(--color-light)' }}>
                      {suggestion.text}
                    </p>
                    <svg
                      className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => {
            const isUser = message.type === 'user';
            const persona = message.persona;
            const color = persona ? personaColors[persona.id] : 'var(--color-primary)';

            return (
              <div
                key={message.id}
                className={`flex gap-3 animate-slideUp ${isUser ? 'justify-end' : 'justify-start'}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Persona Avatar */}
                {!isUser && persona && (
                  <button
                    onClick={() => handlePersonaToggle(persona.id)}
                    className="flex-shrink-0 transition-transform hover:scale-110"
                    disabled={isLoading}
                    title={selectedIds.includes(persona.id) ? 'Click to remove' : 'Click to add'}
                  >
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden"
                      style={{ border: `2px solid ${color}` }}
                    >
                      <Image
                        src={persona.image}
                        alt={persona.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                )}

                {/* Message Bubble */}
                <div className={`max-w-[75%] ${!isUser ? 'space-y-1' : ''}`}>
                  {/* Persona name above message */}
                  {!isUser && persona && (
                    <p className="text-xs font-medium ml-1" style={{ color }}>
                      {persona.name}
                    </p>
                  )}
                  <div
                    className={`p-4 rounded-2xl ${
                      isUser ? 'rounded-br-sm' : 'rounded-bl-sm'
                    }`}
                    style={{
                      backgroundColor: isUser
                        ? 'var(--color-primary)'
                        : 'rgba(255, 255, 255, 0.08)',
                      border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderLeft: !isUser ? `3px solid ${color}` : undefined,
                    }}
                  >
                    <p
                      className="text-sm whitespace-pre-wrap"
                      style={{ color: 'var(--color-light)' }}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>

                {/* User Avatar */}
                {isUser && (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--color-light)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicators */}
          {typingPersonas.map((personaId) => {
            const persona = getPersonaById(personaId);
            if (!persona) return null;
            const color = personaColors[persona.id];

            return (
              <div key={`typing-${personaId}`} className="flex gap-3 animate-fadeIn">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: `2px solid ${color}` }}
                >
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium ml-1" style={{ color }}>
                    {persona.name}
                  </p>
                  <div
                    className="p-4 rounded-2xl rounded-bl-sm"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <div className="flex gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: color }}
                      />
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: color }}
                      />
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 max-w-3xl mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              selectedIds.length === personas.length
                ? 'Ask the group...'
                : selectedIds.length === 1
                ? `Ask ${getPersonaById(selectedIds[0])?.name.split(' ')[0]}...`
                : `Ask ${selectedIds.map((id) => getPersonaById(id)?.name.split(' ')[0]).join(' & ')}...`
            }
            className={`flex-1 px-5 py-3 rounded-full bg-transparent text-sm transition-all duration-300 ${
              isFocused ? 'glow-focus' : ''
            }`}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--color-light)',
            }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            style={{
              background: input.trim()
                ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                : 'rgba(255, 255, 255, 0.1)',
              color: 'var(--color-light)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
