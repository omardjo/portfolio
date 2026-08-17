import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hello! Ask me about Omar's CV, skills, or projects.", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://omar-portfolio-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages((prev) => [...prev, { text: data.message, isBot: true }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "I'm currently offline, but you can email Omar directly!", isBot: true },
        ]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Connection error. Please try again later.', isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 min-w-[44px] min-h-[44px] bg-gradient-to-r from-[#6366f1] via-[#7C5CFF] to-[#36E3FF] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#7C5CFF]/35 hover:shadow-[0_0_25px_rgba(54,227,255,0.45)] transition-all duration-200 active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
            style={{ touchAction: 'manipulation' }}
            aria-label="Ouvrir le Chatbot"
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-16 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-20 z-50 w-auto sm:w-[360px] h-[75vh] max-h-[480px] bg-[#0b1121]/95 border border-white/[0.14] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Omar's AI Assistant"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6366f1] via-[#7C5CFF] to-[#36E3FF] px-4 py-3 flex justify-between items-center text-white shadow-md flex-shrink-0">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <MessageSquare size={17} /> Omar's AI Assistant
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg flex items-center justify-center active:scale-95 transition-colors cursor-pointer min-w-[36px] min-h-[36px] focus-visible:ring-2 focus-visible:ring-white"
                style={{ touchAction: 'manipulation' }}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-2.5 sm:gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] sm:text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-white/[0.06] border border-white/[0.08] text-gray-200 rounded-tl-sm'
                        : 'bg-primary text-white font-medium rounded-tr-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] border border-white/[0.08] text-gray-300 px-3.5 py-2.5 rounded-2xl rounded-tl-sm text-xs sm:text-sm flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> En réflexion...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2.5 sm:p-3 bg-[#070a13] border-t border-white/[0.08] flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-white/[0.05] border border-white/[0.08] hover:border-white/20 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-500 disabled:opacity-50 transition-all"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading}
                className="p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center bg-gradient-to-r from-[#6366f1] to-[#36E3FF] rounded-xl text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-primary"
                style={{ touchAction: 'manipulation' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};