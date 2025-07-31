'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Weight, Ruler, Activity, AlertTriangle, Plus, X, Heart } from 'lucide-react';
import { ChildProfileFormData } from '@/lib/types';

interface ChildFormProps {
  onSubmit: (data: ChildProfileFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<ChildProfileFormData>;
  isEditing?: boolean;
}

export default function ChildForm({ onSubmit, onCancel, initialData, isEditing = false }: ChildFormProps) {
  const [formData, setFormData] = useState<ChildProfileFormData>({
    name: initialData?.name || '',
    birthdate: initialData?.birthdate || '',
    gender: initialData?.gender || 'other',
    weight: initialData?.weight || 0,
    height: initialData?.height || 0,
    activity_level: initialData?.activity_level || 'moderate',
    allergies: initialData?.allergies || [],
    health_notes: initialData?.health_notes || '',
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'შეიყვანეთ ბავშვის სახელი';
    }

    if (!formData.birthdate) {
      newErrors.birthdate = 'აირჩიეთ დაბადების თარიღი';
    } else {
      const birthDate = new Date(formData.birthdate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthdate = 'დაბადების თარიღი არ შეიძლება იყოს მომავალში';
      }
    }

    if (formData.weight <= 0) {
      newErrors.weight = 'შეიყვანეთ სწორი წონა';
    }

    if (formData.height <= 0) {
      newErrors.height = 'შეიყვანეთ სწორი სიმაღლე';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAllergy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'შეცვალეთ ბავშვის პროფილი' : 'დაამატეთ თქვენი ბავშვი'}
              </h2>
            </div>
            <button 
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Child's Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                ბავშვის სახელი *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="მაგ: ნიკუშა"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Birthdate */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                დაბადების თარიღი *
              </label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthdate: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                  errors.birthdate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                სქესი *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="male">მამაკაცი</option>
                <option value="female">ქალი</option>
                <option value="other">სხვა</option>
              </select>
            </div>

            {/* Weight and Height */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Weight className="w-4 h-4" />
                  წონა (კგ) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="15.5"
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4" />
                  სიმაღლე (სმ) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="95.2"
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                )}
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Activity className="w-4 h-4" />
                აქტივობის დონე *
              </label>
              <select
                value={formData.activity_level}
                onChange={(e) => setFormData(prev => ({ ...prev, activity_level: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="low">დაბალი - უმეტესად უმოძრაო</option>
                <option value="moderate">შუა - ზომიერად აქტიური</option>
                <option value="high">მაღალი - ძალიან აქტიური</option>
              </select>
            </div>

            {/* Allergies */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <AlertTriangle className="w-4 h-4" />
                ალერგიები
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="მაგ: რძე, თხილი"
                />
                <button
                  type="button"
                  onClick={addAllergy}
                  className="px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {formData.allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => removeAllergy(index)}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Health Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Heart className="w-4 h-4" />
                ჯანმრთელობის შენიშვნები
              </label>
              <textarea
                value={formData.health_notes}
                onChange={(e) => setFormData(prev => ({ ...prev, health_notes: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="მაგ: უყვარს ხილი, არ უყვარს ბოსტნეული..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                გაუქმება
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'ინახება...' : (isEditing ? 'განახლება' : 'შენახვა')}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
} 