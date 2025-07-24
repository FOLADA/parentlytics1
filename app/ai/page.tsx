"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageCircle } from "lucide-react";
import { useProtectedRoute } from '../hooks/useProtectedRoute';

const COLORS = {
  primary: "#5D9CEC",
  primaryDark: "#3F72AF",
  primaryLight: "#E3F2FD",
  secondary: "#FF9E80",
  white: "#FFFFFF",
  gray100: "#F5F7FA",
  gray200: "#E8EAF6",
  gray300: "#C5CAE9",
  gray500: "#9E9E9E",
  gray700: "#616161",
  gray900: "#263238",
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
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeChat = history.find((c) => c.id === activeChatId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

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
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsSending(true);
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

    // Prepare chat history for API (exclude system prompt)
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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[100vh] bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-100 to-purple-100 border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">Parentlytics</span>
          <button
            className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:from-indigo-600 hover:to-purple-600 transition-all"
            onClick={handleNewChat}
            title="ახალი ჩატი"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <div className="space-y-2">
            {history.map((chat) => (
              <button
                key={chat.id}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-all font-medium shadow-sm border border-transparent hover:bg-indigo-50 hover:border-indigo-200 ${
                  chat.id === activeChatId ? "bg-white border-indigo-400 text-indigo-700" : "bg-indigo-100 text-indigo-900"
                }`}
                onClick={() => setActiveChatId(chat.id)}
              >
                <MessageCircle size={18} className="opacity-70" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-500">
          <div>ბავშვის აღზრდის ექსპერტი</div>
          <div className="text-indigo-600 font-semibold">AI ასისტენტი</div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-white">
        {/* Chat header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center gap-3">
          <MessageCircle size={24} className="text-indigo-400" />
          <span className="text-lg font-semibold text-indigo-700">ბავშვის აღზრდის ჩატი</span>
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 bg-white" style={{ background: COLORS.primaryLight }}>
          {activeChat?.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-md text-base whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-br-md"
                    : "bg-white text-indigo-900 border border-indigo-100 rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {/* Input area */}
        <form
          className="px-8 py-6 bg-white border-t border-gray-100 flex items-center gap-4"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
        >
          <textarea
            className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50 shadow-sm"
            rows={1}
            placeholder="მკითხეთ ნებისმიერი რამ ბავშვის აღზრდის შესახებ..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            style={{ minHeight: 44, maxHeight: 120 }}
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50"
            disabled={isSending || !input.trim()}
            title="გაგზავნა"
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
}
