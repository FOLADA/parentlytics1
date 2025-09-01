
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageCircle, Bot, User, Sparkles, Loader2, Brain } from "lucide-react";
import LoadingStates, { InlineLoader } from '../../components/LoadingStates';
import { motion, AnimatePresence } from "framer-motion";
import { useProtectedRoute } from '../hooks/useProtectedRoute';

const COLORS = {
  primary: "#6366f1",
  primaryDark: "#4f46e5",
  primaryLight: "#eef2ff",
  secondary: "#f59e0b",
  white: "#FFFFFF",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",
};

const initialHistory = [
  { id: 1, title: "ჩატი", messages: [
    { role: "ai", content: "გამარჯობა! მე ვარ თქვენი ბავშვის აღზრდის ექსპერტი. რით შემიძლია დაგეხმაროთ დღეს?" },
  ] },
];

export default function AIPage() {
  useProtectedRoute();
  const [history, setHistory] = useState(initialHistory);
  const [activeChatId, setActiveChatId] = useState(history[0].id);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = history.find((c) => c.id === activeChatId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleNewChat = () => {
    const newId = Math.max(...history.map((h) => h.id)) + 1;
    const newChat = {
      id: newId,
      title: "ახალი ჩატი",
      messages: [
        { role: "ai", content: "გამარჯობა! მე ვარ თქვენი ბავშვის აღზრდის ექსპერტი. რით შემიძლია დაგეხმაროთ დღეს?" },
      ],
    };
    setHistory([newChat, ...history]);
    setActiveChatId(newId);
    setInput("");
  };

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    
    setIsSending(true);
    setIsTyping(true);
    const userMessage = { role: "user", content: input };
    
    // Optimistically add user message
    const updatedHistory = history.map((chat) => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],
        };
      }
      return chat;
    });
    setHistory(updatedHistory);
    setInput("");

    // Prepare chat history for API
    const chatMessages = updatedHistory.find((c) => c.id === activeChatId)?.messages || [];
    
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: chatMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      
      const data = await res.json();
      
      if (data.aiMessage) {
        setHistory((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, { role: "ai", content: data.aiMessage }] }
              : chat
          )
        );
      } else {
        setHistory((prev) =>
          prev.map((chat) =>
            chat.id === activeChatId
              ? { ...chat, messages: [...chat.messages, { role: "ai", content: "უკაცრავად, ვერ მივიღე პასუხი AI-სგან." }] }
              : chat
          )
        );
      }
    } catch (err) {
      setHistory((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, { role: "ai", content: "შეცდომა AI სერვისთან დაკავშირებისას." }] }
            : chat
        )
      );
    }
    
    setIsSending(false);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans overflow-hidden">
      {/* Enhanced Sidebar */}
      <motion.aside 
        className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl"
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Parentlytics AI</span>
          </div>
          <motion.button
            className="p-2 rounded-xl bg-white/20 text-white shadow-lg hover:bg-white/30 transition-all duration-200 hover:scale-105"
            onClick={handleNewChat}
            title="ახალი ჩატი"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
          </motion.button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-2">
            <AnimatePresence>
              {history.map((chat, index) => (
                <motion.button
                  key={chat.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium shadow-sm border-2 ${
                    chat.id === activeChatId 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400 shadow-lg" 
                      : "bg-white/60 text-gray-700 border-transparent hover:bg-white hover:border-indigo-200 hover:shadow-md"
                  }`}
                  onClick={() => setActiveChatId(chat.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={18} className={`${chat.id === activeChatId ? 'text-white' : 'text-indigo-500'}`} />
                  <span className="truncate flex-1">{chat.title}</span>
                  {chat.id === activeChatId && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-indigo-50/50">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>ბავშვის აღზრდის ექსპერტი</span>
          </div>
          <div className="text-indigo-600 font-semibold text-sm mt-1">ასისტენტი</div>
        </div>
      </motion.aside>

      {/* Enhanced Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-transparent">
        {/* Enhanced Chat header */}
        <motion.div 
          className="px-8 py-6 border-b border-gray-200/50 bg-white/60 backdrop-blur-xl flex items-center gap-4 shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-gray-800">ბავშვის აღზრდის ჩატი</span>
            <div className="text-sm text-gray-500">AI-სთან საუბარი</div>
          </div>
          {isTyping && (
            <motion.div 
              className="flex items-center gap-2 text-indigo-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <InlineLoader size="small" message="წერს..." />
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/50">
          <AnimatePresence>
            {activeChat?.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start gap-3 max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`p-2 rounded-full ${msg.role === "user" ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-gray-500 to-gray-600"}`}>
                    {msg.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-lg text-base whitespace-pre-line transition-all duration-200 hover:shadow-xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    {formatMessage(msg.content)}
                  </div>
                </div>
              </div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-gray-500 to-gray-600">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-6 py-4 rounded-2xl bg-white border border-gray-200 rounded-bl-md shadow-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    <span className="text-gray-600">AI ფიქრობს...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input area */}
        <motion.form
          className="px-8 py-6 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 flex items-end gap-4 shadow-lg"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              className="w-full resize-none rounded-2xl border-2 border-gray-200 px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200"
              rows={1}
              placeholder="მკითხეთ ნებისმიერი რამ ბავშვის აღზრდის შესახებ..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
              style={{ minHeight: 56, maxHeight: 120 }}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
              Enter to send, Shift+Enter for new line
            </div>
          </div>
          <motion.button
            type="submit"
            className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSending || !input.trim()}
            title="გაგზავნა"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSending ? (
              <InlineLoader size="small" message="" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </motion.form>
      </main>
    </div>
  );
}
