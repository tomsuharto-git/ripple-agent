'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { project } from '@/config/project';
import { features } from '@/config/features';
import { chatConfig } from '@/data/chat-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Suggestion {
  label: string;
  description: string;
  query: string;
  icon: React.ReactNode;
}

const suggestions: Suggestion[] = [
  {
    label: 'XRP Army',
    description: 'The passionate community behind XRP',
    query: 'Tell me about the XRP Army. Who are they and why are they so passionate?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'XRP vs Bitcoin',
    description: 'How does Ripple compare?',
    query: 'How does XRP stack up against Bitcoin? What are the key differences in technology and use case?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: 'Strengths & Weaknesses',
    description: 'Honest assessment of XRP',
    query: "What are XRP's biggest strengths and weaknesses? Give me an honest assessment.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    label: 'SEC Lawsuit',
    description: 'The case that defined crypto regulation',
    query: 'What happened with the Ripple vs SEC lawsuit? Why was it such a big deal for crypto?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    label: 'Future Potential',
    description: 'Where is XRP headed?',
    query: 'What does the future look like for XRP? Is it a good long-term investment?',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

interface ChatPanelProps {
  /** Start with messages area expanded */
  defaultExpanded?: boolean;
  /** Hide the header section */
  hideHeader?: boolean;
}

export function ChatPanel({ defaultExpanded = false, hideHeader = false }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isFocused, setIsFocused] = useState(false);
  const [isUnhinged, setIsUnhinged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Temperature: Normal = 0.7, Unhinged = 1.0 (max for Anthropic)
  const temperature = isUnhinged ? 1.0 : 0.7;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSuggestionClick = (query: string) => {
    if (isLoading) return;
    setInput(query);
    // Submit immediately after setting input
    submitMessage(query);
  };

  const submitMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage = messageContent.trim();
    setInput('');
    setIsExpanded(true);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          temperature,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      if (features.chatStreaming) {
        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';
        let buffer = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Parse SSE format: "data: {...}\n\n"
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6); // Remove "data: " prefix
                if (data === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) {
                    fullContent += parsed.text;
                    setStreamingContent(fullContent);
                  }
                } catch {
                  // Ignore parse errors for incomplete JSON
                }
              }
            }
          }
        }
        setMessages((prev) => [...prev, { role: 'assistant', content: fullContent }]);
      } else {
        // Non-streaming response
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      }

      setStreamingContent('');
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  // Determine if we should show the welcome state
  const showWelcome = messages.length === 0 && !streamingContent && !isLoading;

  return (
    <section
      className={defaultExpanded ? 'flex-1 flex flex-col' : 'py-16 px-8 md:px-16 lg:px-24'}
    >
      <div className={defaultExpanded ? 'flex-1 flex flex-col w-full' : 'max-w-4xl mx-auto'}>
        {/* Header - only show if not hidden and not defaultExpanded */}
        {!hideHeader && !defaultExpanded && (
          <div className="text-center mb-8">
            <h2
              className="text-3xl md:text-4xl mb-4 gradient-text"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ask {project.name}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-muted)' }}>
              {chatConfig.welcomeMessage}
            </p>
          </div>
        )}

        {/* Chat Container */}
        <div
          className={`glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            defaultExpanded ? 'flex-1 m-4 lg:m-6' : ''
          } ${isFocused ? 'glow' : 'glow-sm'}`}
        >
          {/* Messages Area */}
          <div
            className={`overflow-y-auto flex-1 ${
              defaultExpanded
                ? 'min-h-[300px]'
                : isExpanded
                  ? 'max-h-96'
                  : 'max-h-0'
            }`}
          >
            <div className="p-5 space-y-4">
              {/* Welcome Message - shown when no messages */}
              {showWelcome && defaultExpanded && (
                <div className="py-8 px-4 animate-fadeIn">
                  <div className="text-center mb-8">
                    <div
                      className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center animate-pulse-glow"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      }}
                    >
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3
                      className="text-lg mb-2 font-semibold"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-light)' }}
                    >
                      Ask {project.name} Anything
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      Try one of these to get started
                    </p>
                  </div>

                  {/* Suggestion Buttons */}
                  <div className="grid gap-2 max-w-md mx-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.label}
                        onClick={() => handleSuggestionClick(suggestion.query)}
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
                          {suggestion.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-sm font-medium truncate"
                            style={{ color: 'var(--color-light)' }}
                          >
                            {suggestion.label}
                          </p>
                          <p
                            className="text-xs truncate"
                            style={{ color: 'var(--color-muted)' }}
                          >
                            {suggestion.description}
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: 'var(--color-muted)' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 animate-slideUp ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {message.role === 'assistant' && (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === 'user' ? '' : ''
                    }`}
                    style={{
                      backgroundColor:
                        message.role === 'user'
                          ? 'var(--color-primary)'
                          : 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--color-light)',
                      border: message.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                    }}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-dark prose-headings:mt-2 prose-headings:mb-1 prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-light)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {/* Streaming response */}
              {streamingContent && (
                <div className="flex gap-3 animate-fadeIn">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div
                    className="max-w-[80%] p-4 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="prose prose-sm max-w-none prose-dark prose-headings:mt-2 prose-headings:mb-1 prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                      <ReactMarkdown>{streamingContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && !streamingContent && (
                <div className="flex gap-3 animate-fadeIn">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full typing-dot"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Mode Toggle + Input */}
          <div className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            {/* Mode Toggle - Segmented Control */}
            <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>Response Mode</span>
              <div
                className="relative flex rounded-full p-0.5"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                {/* Sliding background indicator */}
                <div
                  className="absolute top-0.5 bottom-0.5 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: 'calc(50% - 2px)',
                    left: isUnhinged ? 'calc(50% + 1px)' : '2px',
                    background: isUnhinged
                      ? 'linear-gradient(135deg, #ef4444, #f97316)'
                      : 'var(--color-primary)',
                    boxShadow: isUnhinged
                      ? '0 0 12px rgba(239, 68, 68, 0.5)'
                      : '0 0 12px rgba(0, 150, 228, 0.3)',
                  }}
                />
                {/* Normal Button */}
                <button
                  type="button"
                  onClick={() => setIsUnhinged(false)}
                  className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300"
                  style={{
                    color: !isUnhinged ? 'white' : 'var(--color-muted)',
                  }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Normal
                </button>
                {/* Unhinged Button */}
                <button
                  type="button"
                  onClick={() => setIsUnhinged(true)}
                  className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300"
                  style={{
                    color: isUnhinged ? 'white' : 'var(--color-muted)',
                  }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Unhinged
                </button>
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex"
            >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={chatConfig.placeholder}
              className="flex-1 px-5 py-4 bg-transparent focus:outline-none text-sm"
              style={{ color: 'var(--color-light)' }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: input.trim()
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                  : 'transparent',
                color: 'var(--color-light)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
