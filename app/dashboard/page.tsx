'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart, Utensils, MessageCircle, Calendar, Activity, User } from 'lucide-react';
import { useAuth } from '@/context/ChildContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, childProfile, logout } = useAuth();

  const childName = childProfile?.name || '';

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const features = [
    {
      title: 'კვების გეგმა',
      description: 'ყოველდღიური პერსონალიზებული კვების რეკომენდაციები',
      icon: Utensils,
      color: 'bg-orange-500',
      href: '/diet'
    },
    {
      title: 'AI ასისტენტი',
      description: 'კითხვების პასუხები ბავშვის აღზრდის შესახებ',
      icon: MessageCircle,
      color: 'bg-blue-500',
      href: '/chat'
    },
    {
      title: 'ჯანმრთელობის პროფილი',
      description: 'ბავშვის ჯანმრთელობის ინფორმაციის მართვა',
      icon: Heart,
      color: 'bg-pink-500',
      href: '/setup-child'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              მოგესალმებთ, {user?.name || 'მშობელო'}! 💕
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {childProfile ? (
              <>
                {childName}-ის პროფილი მზადაა. აირჩიეთ სასურველი ფუნქცია:
              </>
            ) : (
              <>
                დაგვეხმარეთ ბავშვის პროფილის შექმნაში უკეთესი რეკომენდაციების მისაღებად.
              </>
            )}
          </p>
        </motion.div>

        {/* Child Profile Summary */}
        {childProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{childName || 'ბავშვი'}</h3>
                  <p className="text-gray-600">
                    {new Date().getFullYear() - new Date(childProfile.birthdate).getFullYear()} წლის
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">წონა:</span>
                  <span className="ml-2 font-medium">{childProfile.weight} კგ</span>
                </div>
                <div>
                  <span className="text-gray-500">სიმაღლე:</span>
                  <span className="ml-2 font-medium">{childProfile.height} სმ</span>
                </div>
                <div>
                  <span className="text-gray-500">აქტივობა:</span>
                  <span className="ml-2 font-medium">
                    {childProfile.activity_level === 'low' ? 'დაბალი' :
                     childProfile.activity_level === 'moderate' ? 'შუა' : 'მაღალი'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">ალერგიები:</span>
                  <span className="ml-2 font-medium">
                    {childProfile.allergies.length > 0 ? childProfile.allergies.join(', ') : 'არა'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => router.push(feature.href)}
            >
              <div className={`w-12 h-12 ${feature.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
            სწრაფი მოქმედებები
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/setup-child')}
              className="p-4 bg-white rounded-xl shadow-lg border border-purple-200 hover:border-purple-300 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">პროფილის რედაქტირება</h4>
                  <p className="text-sm text-gray-600">შეცვალეთ ბავშვის ინფორმაცია</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="p-4 bg-white rounded-xl shadow-lg border border-red-200 hover:border-red-300 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-red-500">🚪</div>
                <div>
                  <h4 className="font-semibold text-gray-800">გასვლა</h4>
                  <p className="text-sm text-gray-600">გამოხვიდეთ სისტემიდან</p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Welcome Message for New Users */}
        {!childProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">დაიწყეთ თქვენი მოგზაურობა</h3>
              <p className="mb-4">
                {childName}-ის პროფილის შექმნით მიიღებთ პერსონალიზებულ რეკომენდაციებს
              </p>
              <button
                onClick={() => router.push('/setup-child')}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                დაიწყეთ
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}