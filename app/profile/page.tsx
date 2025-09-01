'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Calendar, 
  Weight, 
  Ruler, 
  Activity, 
  AlertTriangle, 
  Heart, 
  Edit, 
  Save, 
  X,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/context/ChildContext';
import { ChildProfileFormData } from '@/lib/types';
import LoadingStates, { InlineLoader } from '@/components/LoadingStates';

export default function ProfilePage() {
  const router = useRouter();
  const { user, childProfile, updateChildProfile, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ChildProfileFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/signup');
    }
  }, [user, isLoading, router]);

  // Redirect to setup-child if no profile exists
  useEffect(() => {
    if (!isLoading && user && !childProfile) {
      router.push('/setup-child');
    }
  }, [user, childProfile, isLoading, router]);

  const handleEdit = () => {
    if (childProfile) {
      setEditData({
        name: childProfile.name,
        birthdate: childProfile.birthdate,
        gender: childProfile.gender,
        weight: childProfile.weight,
        height: childProfile.height,
        activity_level: childProfile.activity_level,
        allergies: childProfile.allergies,
        health_notes: childProfile.health_notes || '',
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleSave = async () => {
    if (!editData) return;

    try {
      setIsSubmitting(true);
      console.log('Updating profile with data:', editData);
      console.log('Current child profile:', childProfile);
      await updateChildProfile(editData);
      setIsEditing(false);
      setEditData(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
            router.push('/diet');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <LoadingStates type="profile" size="large" />
      </div>
    );
  }

  if (!user || !childProfile) {
    return null; // Will redirect
  }

  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const age = calculateAge(childProfile.birthdate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            დაბრუნება
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ბავშვის პროფილი
              </h1>
              <p className="text-gray-600">
                ნახეთ და შეცვალეთ თქვენი ბავშვის ინფორმაცია
              </p>
            </div>
            
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                რედაქტირება
              </button>
            )}
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {isEditing ? editData?.name : childProfile.name}
                  </h2>
                  <p className="text-blue-100">
                    {age} წლის • {childProfile.gender === 'male' ? 'ბიჭი' : childProfile.gender === 'female' ? 'გოგო' : 'სხვა'}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    ძირითადი ინფორმაცია
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">დაბადების თარიღი:</span>
                      <span className="font-medium">
                        {isEditing ? editData?.birthdate : new Date(childProfile.birthdate).toLocaleDateString('ka-GE')}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Weight className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">წონა:</span>
                      <span className="font-medium">
                        {isEditing ? editData?.weight : childProfile.weight} კგ
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Ruler className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">სიმაღლე:</span>
                      <span className="font-medium">
                        {isEditing ? editData?.height : childProfile.height} სმ
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">აქტივობის დონე:</span>
                      <span className="font-medium">
                        {isEditing ? editData?.activity_level : 
                          childProfile.activity_level === 'low' ? 'დაბალი' :
                          childProfile.activity_level === 'moderate' ? 'შუა' : 'მაღალი'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {/* Health Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    ჯანმრთელობის ინფორმაცია
                  </h3>
                  
                  <div className="space-y-3">
                    {childProfile.allergies.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-gray-700">ალერგიები:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {childProfile.allergies.map((allergy, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                            >
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {childProfile.health_notes && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-gray-700">ჯანმრთელობის შენიშვნები:</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {childProfile.health_notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Form */}
              {isEditing && editData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-50 rounded-lg"
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">რედაქტირება</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        სახელი
                      </label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        დაბადების თარიღი
                      </label>
                      <input
                        type="date"
                        value={editData.birthdate}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, birthdate: e.target.value } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        წონა (კგ)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={editData.weight}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, weight: parseFloat(e.target.value) || 0 } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        სიმაღლე (სმ)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={editData.height}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, height: parseFloat(e.target.value) || 0 } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        აქტივობის დონე
                      </label>
                      <select
                        value={editData.activity_level}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, activity_level: e.target.value as any } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">დაბალი</option>
                        <option value="moderate">შუა</option>
                        <option value="high">მაღალი</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        სქესი
                      </label>
                      <select
                        value={editData.gender}
                        onChange={(e) => setEditData(prev => prev ? { ...prev, gender: e.target.value as any } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="male">მამაკაცი</option>
                        <option value="female">ქალი</option>
                        <option value="other">სხვა</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ჯანმრთელობის შენიშვნები
                    </label>
                    <textarea
                      value={editData.health_notes}
                      onChange={(e) => setEditData(prev => prev ? { ...prev, other_health_concerns: e.target.value } : null)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="მაგ: უყვარს ხილი, არ უყვარს ბოსტნეული..."
                    />
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      გაუქმება
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <InlineLoader size="small" message="ინახება..." />
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          შენახვა
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 