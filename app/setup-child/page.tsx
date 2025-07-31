'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/ChildContext';
import ChildForm from '@/components/ChildForm';
import { ChildProfileFormData } from '@/lib/types';

export default function SetupChildPage() {
  const router = useRouter();
  const { user, childProfile, updateChildProfile, isLoading } = useAuth();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signup');
    }
  }, [user, isLoading, router]);

  // Redirect to profile if child profile already exists
  useEffect(() => {
    if (!isLoading && user && childProfile) {
      router.push('/profile');
    }
  }, [user, childProfile, isLoading, router]);

  const handleSubmit = async (data: ChildProfileFormData) => {
    try {
      await updateChildProfile(data);
      // Show success message briefly before redirecting
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (error) {
      console.error('Error setting up child profile:', error);
      // Show error message to user
      alert('Error creating profile. Please try again or contact support.');
    }
  };

  const handleBack = () => {
    router.push('/signup');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">იტვირთება...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signup
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            უკან
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              მოგესალმებთ Parentlytics-ში! 💕
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            თქვენი ბავშვის პროფილის შექმნით ჩვენ შევძლებთ მოგაწოდოთ პერსონალიზებული რეკომენდაციები და რჩევები
          </p>
        </motion.div>

        {/* Setup Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-800">პროფილის შექმნა</h3>
              </div>
              <p className="text-gray-600 text-sm">
                შეიყვანეთ თქვენი ბავშვის სახელი, დაბადების თარიღი და ძირითადი ინფორმაცია
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-800">ჯანმრთელობის ინფო</h3>
              </div>
              <p className="text-gray-600 text-sm">
                მიუთითეთ წონა, სიმაღლე, ალერგიები და აქტივობის დონე
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-800">პერსონალიზაცია</h3>
              </div>
              <p className="text-gray-600 text-sm">
                მიიღეთ მორგებული რეკომენდაციები და რჩევები
              </p>
            </div>
          </div>
        </motion.div>

        {/* Child Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-pink-200">
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  დაამატეთ თქვენი ბავშვი
                </h2>
                <p className="text-gray-600">
                  ეს ინფორმაცია დაგვეხმარება მოგაწოდოთ საუკეთესო რეკომენდაციები
                </p>
              </div>

              <ChildForm
                onSubmit={handleSubmit}
                onCancel={handleBack}
                isEditing={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
            რატომ ღირს Parentlytics-ის გამოყენება?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-800">პერსონალიზებული კვება</h4>
              </div>
              <p className="text-gray-600 text-sm">
                მიიღეთ ყოველდღიური კვების გეგმა თქვენი ბავშვის ასაკისა და ჯანმრთელობის მიხედვით
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-800">AI ასისტენტი</h4>
              </div>
              <p className="text-gray-600 text-sm">
                მიიღეთ პასუხები ყველა კითხვაზე ბავშვის აღზრდის შესახებ
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-gray-800">უსაფრთხოება</h4>
              </div>
              <p className="text-gray-600 text-sm">
                თქვენი ბავშვის ინფორმაცია უსაფრთხოდ ინახება და დაცულია
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 