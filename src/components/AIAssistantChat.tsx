import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, AlertTriangle, CornerDownLeft } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AskResponse {
  reply?: string;
  error?: string;
  code?: string;
}

const QUICK_PROMPTS = [
  'What does a residential extension cost?',
  'How long does planning permission take?',
  'Do I need building regulations approval?',
  'What is a Party Wall Agreement?',
  'Draft a design brief for a loft conversion',
];

/**
 * Floating AI Design Assistant — Studio Arch blueprint-themed chat widget.
 * Sends messages to the serverless endpoint /api/ask (keeps the Gemini key
 * server-side). When the key isn't configured yet the API replies with a
 * helpful 503 and we render a setup hint instead of an error.
 */
export const AIAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Welcome to the Studio Arch drafting desk. I can answer questions on planning permission, building regulations, structural engineering, fees, and our design process. How can I assist with your project?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  const sendMessage = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data: AskResponse = await res.json();

      if (!res.ok) {
        if (data.code === 'MISSING_API_KEY') {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                'The AI assistant is currently offline — the GEMINI_API_KEY has not been configured on this deployment yet. Once the site owner adds a free key in Vercel (Project → Settings → Environment Variables) this assistant will respond instantly.',
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.error || 'Sorry — something went wrong. Please try again.' },
          ]);
        }
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'No response received. Please try again.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error — please check your connection and try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
{/* Floating trigger button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)_+_24px)] right-4 sm:right-6 z-50 group flex items-center space-x-2 bg-ink hover:bg-ink-soft text-white border border-white/10 pl-4 pr-4 py-3.5 shadow-2xl transition-all hover:shadow-black/30 hover:scale-[1.02] cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-brass-light" />
        ) : (
          <Bot className="w-5 h-5 text-brass-light" />
        )}
        <span className="font-sans text-xs font-bold uppercase tracking-wider hidden sm:inline">
          {isOpen ? 'Close' : 'AI Assistant'}
        </span>
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)_+_6rem)] right-3 sm:right-6 z-50 w-[calc(100vw_-_1.5rem)] sm:w-[calc(100vw_-_3rem)] max-w-sm h-[520px] max-h-[calc(100dvh_-_6rem)] flex flex-col bg-ink border border-brass/40/60 shadow-2xl overflow-hidden bg-blueprint-dark">
          {/* Header */}
          <div className="px-4 py-3 bg-ink-soft border-b border-brass/40/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-ink border border-brass/40/60 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brass-light" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm leading-tight">AI DESIGN ASSISTANT</p>
                <p className="text-[10px] font-sans text-brass-light flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass mr-1.5 animate-pulse" />
                  {isLoading ? 'DRAFTING RESPONSE…' : 'SYSTEM: ONLINE'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="text-stone hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed border ${
                    m.role === 'user'
                      ? 'bg-ink-soft border-brass/40/60 text-brass-light'
                      : 'bg-ink-soft border-white/10 text-white/85'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <p className="text-[9px] font-sans text-brass-light tracking-widest mb-1">
                      ARCH-DRAFT // REPLY 0{idx + 1}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap font-sans">{m.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 bg-ink-soft border border-white/10 text-white/70 text-[13px] flex items-center space-x-2">
                  <Loader2 className="w-3.5 h-3.5 text-brass-light animate-spin" />
                  <span className="font-sans text-[11px]">CALCULATING…</span>
                </div>
              </div>
            )}
          </div>
{/* Quick prompts */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isLoading}
                  className="px-2 py-1 text-[10px] font-sans text-brass-light bg-ink/40 hover:bg-brass/20 border border-brass/40/60 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-brass/40/50 bg-ink-soft">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center space-x-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about plans, regs, costs…"
                disabled={isLoading}
                className="flex-1 bg-ink border border-white/10 focus:border-brass/40 px-3 py-2.5 text-[13px] text-white/90 placeholder:text-stone outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="w-10 h-10 bg-brass hover:bg-brass text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[9px] font-sans text-stone">
              <span className="flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1 text-amber-500/70" />
                AI-GENERATED GUIDANCE — CONFIRM WITH OUR TECHNICIANS
              </span>
              <span className="flex items-center">
                <CornerDownLeft className="w-3 h-3 mr-1" /> ENTER TO SEND
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};