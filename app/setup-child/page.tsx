'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/ChildContext';
import ChildForm from '@/components/ChildForm';
import { ChildProfileFormData } from '@/lib/types';

export default function SetupChildPage() {
  const router = useRouter();
  const { user, childProfile, updateChildProfile, isLoading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !user) router.push('/signup');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isLoading && user && childProfile) router.push('/profile');
  }, [user, childProfile, isLoading, router]);

  const handleSubmit = async (data: ChildProfileFormData) => {
    try {
      await updateChildProfile(data);
      setShowForm(false);
      setShowWelcome(true);
    } catch (error) {
      console.error('Error setting up child profile:', error);
      alert('Error creating profile. Please try again or contact support.');
    }
  };

  const handleBack = () => router.push('/signup');
  const handleContinue = () => router.push('/profile');
  const handleAddChild = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EDEAF7] to-[#D3C5F7] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A0DAD] mx-auto mb-4"></div>
          <p className="text-[#0D0D0D] text-lg font-medium">იტვირთება...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  const Card = ({ step, title, description }: { step: string; title: string; description: string }) => (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg border border-[#D3C5F7] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-[#1B1464] text-white rounded-full flex items-center justify-center font-semibold">
          {step}
        </div>
        <h3 className="text-lg font-semibold text-[#0D0D0D]">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  const BenefitCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-[#D3C5F7] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-[#6A0DAD]" />
        <h4 className="font-semibold text-[#0D0D0D]">{title}</h4>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  const StepsGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card step="1" title="პროფილის შექმნა" description="შეიყვანეთ თქვენი ბავშვის სახელი, დაბადების თარიღი და ძირითადი ინფორმაცია" />
      <Card step="2" title="ჯანმრთელობის ინფო" description="მიუთითეთ წონა, სიმაღლე, ალერგიები და აქტივობის დონე" />
      <Card step="3" title="პერსონალიზაცია" description="მიიღეთ მორგებული რეკომენდაციები და რჩევები" />
    </div>
  );

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#EDEAF7] to-[#D3C5F7]">
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#0D0D0D] mb-4">მოგესალმებით Parentlytics-ში</h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              თქვენი ბავშვის პროფილის შექმნით ჩვენ შევძლებთ მოგაწოდოთ პერსონალიზებული რეკომენდაციები და რჩევები
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mb-10">
            <StepsGrid />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-[#1B1464] text-white rounded-2xl hover:bg-[#6A0DAD] transition-colors font-semibold text-lg shadow-md"
            >
              გაგრძელება
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDEAF7] to-[#D3C5F7]">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <button onClick={handleBack} className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0D0D0D] mb-6">
            <ArrowLeft className="w-4 h-4" /> უკან
          </button>
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-4">მოგესალმებით Parentlytics-ში</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            თქვენი ბავშვის პროფილის შექმნით ჩვენ შევძლებთ მოგაწოდოთ პერსონალიზებული რეკომენდაციები და რჩევები
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mb-10">
          <StepsGrid />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
          <motion.button
            onClick={handleAddChild}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#1B1464] text-white rounded-2xl hover:bg-[#6A0DAD] font-semibold text-lg shadow-md transition-all"
          >
            დაამატეთ თქვენი ბავშვი
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-[#0D0D0D] text-center mb-8">რატომ ღირს Parentlytics-ის გამოყენება?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard icon={CheckCircle} title="პერსონალიზებული კვება" description="მიიღეთ ყოველდღიური კვების გეგმა თქვენი ბავშვის ასაკისა და ჯანმრთელობის მიხედვით" />
            <BenefitCard icon={CheckCircle} title="AI ასისტენტი" description="მიიღეთ პასუხები ყველა კითხვაზე ბავშვის აღზრდის შესახებ" />
            <BenefitCard icon={CheckCircle} title="ქომუნითი" description="მშობელთა საზოგადოება, რომლებიც დაგეხმარებიან მათი გამოცდილებიდან" />
          </div>
        </motion.div>
      </div>

      {showForm && (
        <motion.div ref={formRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-12">
          <ChildForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} isEditing={false} />
        </motion.div>
      )}
    </div>
  );
}
