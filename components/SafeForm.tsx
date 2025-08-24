import React, { useState, useEffect } from 'react';
import { 
  validateRegistrationForm, 
  validateChildProfileForm, 
  sanitizeFormInput,
  RateLimiter 
} from '@/lib/validation';

interface SafeFormProps {
  type: 'registration' | 'child-profile';
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
  initialData?: any;
  className?: string;
}

export default function SafeForm({ 
  type, 
  onSubmit, 
  onCancel, 
  initialData = {}, 
  className = '' 
}: SafeFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimiter] = useState(() => new RateLimiter(5, 15 * 60 * 1000)); // 5 attempts per 15 minutes

  // Validate form data
  const validateForm = () => {
    let validationResult;
    
    if (type === 'registration') {
      validationResult = validateRegistrationForm(formData);
    } else if (type === 'child-profile') {
      validationResult = validateChildProfileForm(formData);
    } else {
      setErrors({ general: 'Invalid form type' });
      return false;
    }

    setErrors(validationResult.errors);
    return validationResult.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    const userIdentifier = formData.email || 'anonymous';
    if (!rateLimiter.isAllowed(userIdentifier)) {
      const resetTime = rateLimiter.getResetTime(userIdentifier);
      const remainingTime = Math.ceil((resetTime - Date.now()) / 1000 / 60);
      setErrors({ 
        general: `Too many attempts. Please wait ${remainingTime} minutes before trying again.` 
      });
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Sanitize all form inputs before submission
      const sanitizedData = Object.keys(formData).reduce((acc, key) => {
        const value = formData[key];
        if (typeof value === 'string') {
          acc[key] = sanitizeFormInput(value, 'text');
        } else if (typeof value === 'number') {
          acc[key] = sanitizeFormInput(value, 'number');
        } else if (Array.isArray(value)) {
          acc[key] = value.map(item => 
            typeof item === 'string' ? sanitizeFormInput(item, 'text') : item
          );
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      await onSubmit(sanitizedData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with sanitization
  const handleInputChange = (field: string, value: any, type: 'text' | 'email' | 'number' | 'date' = 'text') => {
    const sanitizedValue = sanitizeFormInput(value, type);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Render form fields based on type
  const renderFields = () => {
    if (type === 'registration') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName || ''}
              onChange={(e) => handleInputChange('fullName', e.target.value, 'text')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              maxLength={50}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value, 'email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              maxLength={100}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value, 'text')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              maxLength={128}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              value={formData.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value, 'text')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              maxLength={128}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </>
      );
    }

    if (type === 'child-profile') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Child's Name *
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value, 'text')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter child's name"
              maxLength={50}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Birth Date *
            </label>
            <input
              type="date"
              value={formData.birthdate || ''}
              onChange={(e) => handleInputChange('birthdate', e.target.value, 'date')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.birthdate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthdate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="200"
              value={formData.weight || ''}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value), 'number')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter weight in kg"
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              min="10"
              max="300"
              value={formData.height || ''}
              onChange={(e) => handleInputChange('height', parseFloat(e.target.value), 'number')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter height in cm"
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height}</p>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      {renderFields()}

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 