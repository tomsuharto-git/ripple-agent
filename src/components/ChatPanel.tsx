'use client';

import { useState, useRef, useEffect } from 'react';
import { project } from '@/config/project';
import { features } from '@/config/features';
import { chatConfig } from '@/data/chat-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
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

  return (
    <section
      className="py-16 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2
            className="text-3xl md:text-4xl mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-light)',
            }}
          >
            Ask {project.name}
          </h2>
          <p
            className="text-lg opacity-60"
            style={{ color: 'var(--color-light)' }}
          >
            {chatConfig.welcomeMessage}
          </p>
        </div>

        {/* Chat Container */}
        <div
          className="border rounded-lg overflow-hidden"
          style={{ borderColor: 'var(--color-muted)' }}
        >
          {/* Messages Area (expandable) */}
          <div
            className={`overflow-y-auto transition-all duration-300 ${
              isExpanded ? 'max-h-96' : 'max-h-0'
            }`}
            style={{ backgroundColor: 'var(--color-light)' }}
          >
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-light)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded ${
                      message.role === 'user' ? 'text-right' : ''
                    }`}
                    style={{
                      backgroundColor:
                        message.role === 'user'
                          ? 'var(--color-dark)'
                          : 'var(--color-light)',
                      color:
                        message.role === 'user'
                          ? 'var(--color-light)'
                          : 'var(--color-dark)',
                      border: message.role === 'assistant' ? '1px solid var(--color-muted)' : 'none',
                    }}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-dark)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {/* Streaming response */}
              {streamingContent && (
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-light)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div
                    className="max-w-[80%] p-3 rounded border"
                    style={{
                      backgroundColor: 'var(--color-light)',
                      borderColor: 'var(--color-muted)',
                    }}
                  >
                    <p className="whitespace-pre-wrap text-sm">{streamingContent}</p>
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && !streamingContent && (
                <div className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-light)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div
                    className="p-3 rounded border"
                    style={{
                      backgroundColor: 'var(--color-light)',
                      borderColor: 'var(--color-muted)',
                    }}
                  >
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: 'var(--color-muted)' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: 'var(--color-muted)', animationDelay: '0.2s' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: 'var(--color-muted)', animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex border-t"
            style={{ borderColor: 'var(--color-muted)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatConfig.placeholder}
              className="flex-1 px-4 py-4 focus:outline-none"
              style={{
                backgroundColor: 'var(--color-light)',
                color: 'var(--color-dark)',
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--color-primary)',
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
    </section>
  );
}
