'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Weight, Ruler, Activity, AlertTriangle, Plus, X, Heart, Baby, Gamepad2, BookOpen, Palette, Music, Star, Rainbow, Flower, Sun, Moon, Cloud, Trees, Car, Gift, Cake, IceCream, Sparkles } from 'lucide-react';
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
    other_health_concerns: initialData?.other_health_concerns || '',
  });

  
  const [weightDisplay, setWeightDisplay] = useState(
    initialData?.weight && initialData.weight > 0 ? initialData.weight.toString() : ''
  );
  const [heightDisplay, setHeightDisplay] = useState(
    initialData?.height && initialData.height > 0 ? initialData.height.toString() : ''
  );

  const [newAllergy, setNewAllergy] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update display values when initialData changes
  React.useEffect(() => {
    console.log('initialData changed:', initialData);
    if (initialData?.weight !== undefined) {
      const weightValue = initialData.weight > 0 ? initialData.weight.toString() : '';
      console.log('Setting weight display to:', weightValue, 'from initialData.weight:', initialData.weight);
      setWeightDisplay(weightValue);
    }
    if (initialData?.height !== undefined) {
      const heightValue = initialData.height > 0 ? initialData.height.toString() : '';
      console.log('Setting height display to:', heightValue, 'from initialData.height:', initialData.height);
      setHeightDisplay(heightValue);
    }
  }, [initialData]);

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

  // Handle weight input focus and change
  const handleWeightFocus = () => {
    console.log('Weight input focused, current display:', weightDisplay);
    if (weightDisplay === '0') {
      console.log('Clearing weight display (was 0)');
      setWeightDisplay('');
    }
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Weight input change:', value);
    
    // Allow only numbers, decimal point, and empty string
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      console.log('Setting weight display to:', value);
      setWeightDisplay(value);
      
      if (value === '' || value === '0') {
        setFormData(prev => ({ ...prev, weight: 0 }));
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          setFormData(prev => ({ ...prev, weight: numValue }));
        }
      }
    } else {
      console.log('Invalid weight value, not updating:', value);
    }
  };

  // Handle height input focus and change
  const handleHeightFocus = () => {
    console.log('Height input focused, current display:', heightDisplay);
    if (heightDisplay === '0') {
      console.log('Clearing height display (was 0)');
      setHeightDisplay('');
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Height input change:', value);
    
    // Allow only numbers, decimal point, and empty string
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      console.log('Setting height display to:', value);
      setHeightDisplay(value);
      
      if (value === '' || value === '0') {
        setFormData(prev => ({ ...prev, height: 0 }));
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          setFormData(prev => ({ ...prev, height: numValue }));
        }
      }
    } else {
      console.log('Invalid height value, not updating:', value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 z-50 relative overflow-hidden"
    >
      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Baby and Child Icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 text-purple-400 opacity-60"
        >
          <Baby className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 3, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/5 text-purple-500 opacity-60"
        >
          <Gamepad2 className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/6 right-1/4 text-purple-600 opacity-60"
        >
          <BookOpen className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 5, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-2/3 left-1/5 text-purple-400 opacity-60"
        >
          <Palette className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 4, -4, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-3/4 right-1/6 text-purple-500 opacity-60"
        >
          <Music className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 18, 0],
            rotate: [0, -6, 6, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute top-1/5 left-1/3 text-purple-400 opacity-60"
        >
          <Star className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -22, 0],
            rotate: [0, 7, -7, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
          className="absolute top-2/5 right-1/3 text-purple-500 opacity-60"
        >
          <Rainbow className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 16, 0],
            rotate: [0, -4, 4, 0],
            scale: [1, 0.85, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
          className="absolute top-1/2 left-1/4 text-purple-600 opacity-60"
        >
          <Flower className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -19, 0],
            rotate: [0, 6, -6, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
          className="absolute top-3/5 right-1/4 text-purple-500 opacity-60"
        >
          <Sun className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 21, 0],
            rotate: [0, -5, 5, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 9
          }}
          className="absolute top-1/3 left-1/2 text-purple-400 opacity-60"
        >
          <Moon className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -17, 0],
            rotate: [0, 4, -4, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
          className="absolute top-2/3 right-1/2 text-purple-500 opacity-60"
        >
          <Cloud className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 23, 0],
            rotate: [0, -7, 7, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 11
          }}
          className="absolute top-1/4 left-2/3 text-purple-600 opacity-60"
        >
          <Trees className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 12
          }}
          className="absolute top-3/4 left-2/3 text-purple-400 opacity-60"
        >
          <Car className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -6, 6, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 13
          }}
          className="absolute top-1/6 left-3/4 text-purple-500 opacity-60"
        >
          <Gift className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, -4, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 14
          }}
          className="absolute top-2/5 left-3/4 text-purple-600 opacity-60"
        >
          <Cake className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 25, 0],
            rotate: [0, -8, 8, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
          className="absolute top-1/2 right-3/4 text-purple-500 opacity-60"
        >
          <IceCream className="w-7 h-7" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -16, 0],
            rotate: [0, 6, -6, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 16
          }}
          className="absolute top-3/5 left-1/6 text-purple-600 opacity-60"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        {/* Additional Purple Icons for More Variety */}
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [0, -4, 4, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 17
          }}
          className="absolute top-1/8 right-1/8 text-purple-300 opacity-60"
        >
          <Heart className="w-5 h-5" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 18
          }}
          className="absolute top-4/5 left-1/4 text-purple-400 opacity-60"
        >
          <Star className="w-4 h-4" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 19, 0],
            rotate: [0, -3, 3, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 19
          }}
          className="absolute top-2/6 right-2/5 text-purple-500 opacity-60"
        >
          <Baby className="w-6 h-6" />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4 relative z-10"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-purple-500" />
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  type="text"
                  inputMode="decimal"
                  value={weightDisplay}
                  onChange={handleWeightChange}
                  onFocus={handleWeightFocus}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                  type="text"
                  inputMode="decimal"
                  value={heightDisplay}
                  onChange={handleHeightChange}
                  onFocus={handleHeightFocus}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="მაგ: რძე, თხილი"
                />
                <button
                  type="button"
                  onClick={addAllergy}
                  className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {formData.allergies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => removeAllergy(index)}
                        className="text-purple-600 hover:text-purple-800"
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
                value={formData.other_health_concerns}
                onChange={(e) => setFormData(prev => ({ ...prev, other_health_concerns: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'ინახება...' : (isEditing ? 'განახლება' : 'შენახვა')}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-15px) rotate(2deg) scale(1.05); 
            opacity: 0.6;
          }
        }
        
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) rotate(-3deg) scale(1.1); 
            opacity: 0.5;
          }
        }
        
        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-10px) rotate(1deg) scale(1.02); 
            opacity: 0.7;
          }
        }
        
        @keyframes sparkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: scale(1.2) rotate(180deg); 
            opacity: 0.8;
          }
        }
        
        .floating-icon {
          animation: float-gentle 8s ease-in-out infinite;
        }
        
        .floating-icon-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .floating-icon-fast {
          animation: float-fast 6s ease-in-out infinite;
        }
        
        .sparkle-icon {
          animation: sparkle 10s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
} 
