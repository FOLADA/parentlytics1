'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Weight, Ruler, Activity, AlertTriangle, Plus, X, Heart, Baby, Gamepad2, BookOpen, Palette, Music, Star, Rainbow, Flower, Sun, Moon, Cloud, Trees, Car, Gift, Cake, IceCream, Sparkles } from 'lucide-react';
import { ChildProfileFormData } from '@/lib/types';
import { validateChildProfileForm, sanitizeFormInput } from '@/lib/validation';
import SafeText from './SafeText';

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
    const validationResult = validateChildProfileForm(formData);
    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      // Sanitize form data before submission
      const sanitizedData = {
        ...formData,
        name: sanitizeFormInput(formData.name, 'text'),
        other_health_concerns: sanitizeFormInput(formData.other_health_concerns, 'text'),
        allergies: formData.allergies.map(allergy => sanitizeFormInput(allergy, 'text'))
      };
      
      await onSubmit(sanitizedData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      const sanitizedAllergy = sanitizeFormInput(newAllergy.trim(), 'text');
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, sanitizedAllergy]
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

  const handleInputChange = (field: keyof ChildProfileFormData, value: any) => {
    // Sanitize input based on field type
    let sanitizedValue = value;
    
    if (field === 'name' || field === 'other_health_concerns') {
      sanitizedValue = sanitizeFormInput(value, 'text');
    } else if (field === 'weight' || field === 'height') {
      sanitizedValue = sanitizeFormInput(parseFloat(value) || 0, 'number');
    }
    
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <SafeText 
          content={isEditing ? "Edit Child Profile" : "Create Child Profile"} 
          tag="h2" 
          className="text-2xl font-bold text-gray-800 mb-2"
        />
        <SafeText 
          content="Please provide your child's information to get personalized recommendations" 
          tag="p" 
          className="text-gray-600"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Child's Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter child's name"
            maxLength={50}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Birth Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-2" />
            Birth Date *
          </label>
          <input
            type="date"
            value={formData.birthdate}
            onChange={(e) => handleInputChange('birthdate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          {errors.birthdate && (
            <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Weight Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Weight className="inline w-4 h-4 mr-2" />
            Weight (kg) *
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={weightDisplay}
            onChange={(e) => {
              const value = e.target.value;
              setWeightDisplay(value);
              if (value === '') {
                handleInputChange('weight', 0);
              } else {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  handleInputChange('weight', numValue);
                }
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0.0"
            maxLength={6}
            required
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
        </div>

        {/* Height Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Ruler className="inline w-4 h-4 mr-2" />
            Height (cm) *
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={heightDisplay}
            onChange={(e) => {
              const value = e.target.value;
              setHeightDisplay(value);
              if (value === '') {
                handleInputChange('height', 0);
              } else {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  handleInputChange('height', numValue);
                }
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="0.0"
            maxLength={6}
            required
          />
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">{errors.height}</p>
          )}
        </div>

        {/* Activity Level Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity className="inline w-4 h-4 mr-2" />
            Activity Level
          </label>
          <select
            value={formData.activity_level}
            onChange={(e) => handleInputChange('activity_level', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Allergies Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <AlertTriangle className="inline w-4 h-4 mr-2" />
            Allergies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add allergy"
              maxLength={100}
            />
            <button
              type="button"
              onClick={addAllergy}
              className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  <SafeText content={allergy} tag="span" />
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

        {/* Health Concerns Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Heart className="inline w-4 h-4 mr-2" />
            Health Concerns
          </label>
          <textarea
            value={formData.other_health_concerns}
            onChange={(e) => handleInputChange('other_health_concerns', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Any health concerns or special dietary needs..."
            maxLength={500}
          />
          {errors.other_health_concerns && (
            <p className="text-red-500 text-sm mt-1">{errors.other_health_concerns}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (isEditing ? 'Update Profile' : 'Create Profile')}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
} 
