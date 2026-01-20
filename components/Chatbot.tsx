import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'; // Added Loader2
import { motion, AnimatePresence } from 'framer-motion';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Hello! Ask me about Omar's CV, skills, or projects.", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]); // Scroll when loading state changes too

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    // Add User Message
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      // Connect to your actual Backend
      const response = await fetch('https://omar-portfolio-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await response.json();

      if (data.message) {
        setMessages(prev => [...prev, { text: data.message, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "I'm currently offline, but you can email Omar directly!", isBot: true }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { text: "Connection error. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
           <motion.button
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             exit={{ scale: 0 }}
             onClick={() => setIsOpen(true)}
             className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-primary hover:bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/50 transition-all"
             aria-label="Open Chatbot"
           >
             <MessageSquare />
           </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 w-[350px] max-w-[90vw] h-[500px] bg-dark border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2"><MessageSquare size={18}/> Omar's AI Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={18}/></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-card/50 flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.isBot ? 'bg-gray-700 text-gray-200 rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-200 p-3 rounded-xl rounded-tl-none text-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-dark border-t border-gray-700 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="flex-1 bg-gray-800 border-none rounded-full px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading}
                className="p-2 bg-primary rounded-full text-white hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};