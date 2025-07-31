'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '@/context/ChildContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { childProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const childName = childProfile?.name || '';

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `გამარჯობა! რით შეგვიძლია დავეხმაროთ ${childName}-ს? მე ვარ თქვენი AI ასისტენტი, რომელიც დაგეხმარებათ ბავშვის აღზრდის ყველა საკითხში. შეგიძლიათ მკითხოთ კვების, ჯანმრთელობის, განვითარების ან ნებისმიერი სხვა კითხვა.`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [childName, messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Mock AI response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(inputValue, childProfile),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'ბოდიში, დროებით ვერ შევძელი პასუხის გაცემა. გთხოვთ სცადოთ მოგვიანებით.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string, childProfile: any): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('კვებ') || input.includes('საჭმელი') || input.includes('ხილ')) {
      return `${childProfile?.name || 'ბავშვის'} ჯანსაღი კვება ძალიან მნიშვნელოვანია! რეკომენდაცია მოგცემთ ყოველდღიური კვების გეგმის შექმნაში. შეგიძლიათ გადახედოთ ჩვენს კვების გეგმას "კვება" განყოფილებაში.`;
    }
    
    if (input.includes('ძილი') || input.includes('საძინებელი')) {
      return `${childProfile?.name || 'ბავშვის'} ასაკისთვის ძილის რეჟიმი ძალიან მნიშვნელოვანია. რეკომენდაცია მოგცემთ ძილის ხარისხის გასაუმჯობესებლად.`;
    }
    
    if (input.includes('აქტივობ') || input.includes('თამაში') || input.includes('სპორტ')) {
      return `${childProfile?.name || 'ბავშვის'} ასაკისთვის ფიზიკური აქტივობა ძალიან მნიშვნელოვანია განვითარებისთვის. რეკომენდაცია მოგცემთ შესაფერისი თამაშებისა და აქტივობების შესახებ.`;
    }
    
    if (input.includes('ალერგი') || input.includes('ჯანმრთელობა')) {
      return `თუ ${childProfile?.name || 'ბავშვს'} აქვს ალერგიები, ძალიან მნიშვნელოვანია მათი გათვალისწინება კვებაში. რეკომენდაცია მოგცემთ უსაფრთხო კვების შესახებ.`;
    }
    
    return `მადლობა კითხვისთვის! ${childProfile?.name || 'ბავშვის'} აღზრდის შესახებ ყველა კითხვაზე ვცდილობთ დაგეხმაროთ. შეგიძლიათ მკითხოთ კონკრეტული კითხვები კვების, ჯანმრთელობის, განვითარების ან ნებისმიერი სხვა თემის შესახებ.`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              AI ასისტენტი
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {childName ? `რით შეგვიძლია დავეხმაროთ ${childName}-ს?` : 'რით შეგვიძლია დავეხმაროთ ბავშვს?'}
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('ka-GE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-600">წერა...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="დაწერეთ თქვენი კითხვა..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
            სწრაფი კითხვები
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'როგორ უნდა გავაუმჯობესოთ კვება?',
              'რა აქტივობებია შესაფერისი?',
              'როგორ უნდა გავაუმჯობესოთ ძილი?'
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="p-4 bg-white rounded-xl shadow-lg border border-blue-100 hover:border-blue-300 transition-colors text-left"
              >
                <p className="text-sm text-gray-700">{question}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 