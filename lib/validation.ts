// Validation and Security Utilities for Parentlytics

// XSS Prevention - Sanitize HTML content
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Remove potentially dangerous HTML tags and attributes
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/gi, '')
    .replace(/<meta\b[^<]*(?:(?!<\/meta>)<[^<]*)*<\/meta>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '') // Remove all remaining HTML tags
    .trim();
};

// SQL Injection Prevention - Sanitize database inputs
export const sanitizeDatabaseInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Remove SQL injection patterns
  return input
    .replace(/['";\\]/g, '') // Remove quotes, semicolons, backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove SQL block comments
    .replace(/union\s+select/gi, '') // Remove UNION SELECT
    .replace(/drop\s+table/gi, '') // Remove DROP TABLE
    .replace(/delete\s+from/gi, '') // Remove DELETE FROM
    .replace(/insert\s+into/gi, '') // Remove INSERT INTO
    .replace(/update\s+set/gi, '') // Remove UPDATE SET
    .trim();
};

// Input length validation
export const validateInputLength = (input: string, min: number, max: number): boolean => {
  if (typeof input !== 'string') return false;
  const length = input.trim().length;
  return length >= min && length <= max;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} => {
  if (typeof password !== 'string') {
    return { isValid: false, score: 0, feedback: ['Password must be a string'] };
  }

  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password must be at least 8 characters long');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain at least one uppercase letter');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain at least one lowercase letter');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain at least one number');
  }

  // Special character check
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Password must contain at least one special character');
  }

  // No common patterns
  const commonPatterns = ['password', '123456', 'qwerty', 'admin', 'user'];
  if (!commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    score += 1;
  } else {
    feedback.push('Password should not contain common patterns');
  }

  const isValid = score >= 4; // Require at least 4 out of 6 criteria

  return { isValid, score, feedback };
};

// Name validation
export const validateName = (name: string): boolean => {
  if (typeof name !== 'string') return false;
  
  const sanitizedName = sanitizeHtml(name);
  const nameRegex = /^[a-zA-Zა-ჰ\s'-]{2,50}$/; // Allow Georgian, Latin, spaces, hyphens, apostrophes
  
  return nameRegex.test(sanitizedName) && validateInputLength(sanitizedName, 2, 50);
};

// Date validation
export const validateDate = (date: string): boolean => {
  if (typeof date !== 'string') return false;
  
  const dateObj = new Date(date);
  const today = new Date();
  
  // Check if it's a valid date
  if (isNaN(dateObj.getTime())) return false;
  
  // Check if date is not in the future
  if (dateObj > today) return false;
  
  // Check if date is not too far in the past (e.g., 150 years ago)
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 150);
  if (dateObj < minDate) return false;
  
  return true;
};

// Weight validation
export const validateWeight = (weight: number): boolean => {
  if (typeof weight !== 'number' || isNaN(weight)) return false;
  
  // Weight should be between 0.1 kg and 200 kg
  return weight >= 0.1 && weight <= 200;
};

// Height validation
export const validateHeight = (height: number): boolean => {
  if (typeof height !== 'number' || isNaN(height)) return false;
  
  // Height should be between 10 cm and 300 cm
  return height >= 10 && height <= 300;
};

// Age validation (in months)
export const validateAgeInMonths = (birthdate: string): boolean => {
  if (!validateDate(birthdate)) return false;
  
  const birth = new Date(birthdate);
  const today = new Date();
  const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + 
                     (today.getMonth() - birth.getMonth());
  
  // Age should be between 0 and 18 years (216 months)
  return ageInMonths >= 0 && ageInMonths <= 216;
};

// Allergy validation
export const validateAllergy = (allergy: string): boolean => {
  if (typeof allergy !== 'string') return false;
  
  const sanitized = sanitizeHtml(allergy);
  return validateInputLength(sanitized, 1, 100);
};

// Health concerns validation
export const validateHealthConcerns = (concerns: string): boolean => {
  if (typeof concerns !== 'string') return false;
  
  const sanitized = sanitizeHtml(concerns);
  return validateInputLength(sanitized, 0, 500);
};

// Form validation for child profile
export const validateChildProfileForm = (data: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name || !validateName(data.name)) {
    errors.name = 'Please enter a valid name (2-50 characters, letters only)';
  }

  // Birthdate validation
  if (!data.birthdate || !validateDate(data.birthdate)) {
    errors.birthdate = 'Please enter a valid birthdate (not in the future)';
  }

  // Weight validation
  if (!validateWeight(data.weight)) {
    errors.weight = 'Please enter a valid weight (0.1-200 kg)';
  }

  // Height validation
  if (!validateHeight(data.height)) {
    errors.height = 'Please enter a valid height (10-300 cm)';
  }

  // Gender validation
  if (!['male', 'female', 'other'].includes(data.gender)) {
    errors.gender = 'Please select a valid gender';
  }

  // Activity level validation
  if (!['low', 'moderate', 'high'].includes(data.activity_level)) {
    errors.activity_level = 'Please select a valid activity level';
  }

  // Allergies validation
  if (Array.isArray(data.allergies)) {
    data.allergies.forEach((allergy: string, index: number) => {
      if (!validateAllergy(allergy)) {
        errors[`allergies.${index}`] = 'Invalid allergy entry';
      }
    });
  }

  // Health concerns validation
  if (data.health_notes && !validateHealthConcerns(data.health_notes)) {
    errors.health_notes = 'Health concerns must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Form validation for user registration
export const validateRegistrationForm = (data: any): {
  isValid: boolean;
  errors: Record<string, string>;
} => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.fullName || !validateName(data.fullName)) {
    errors.fullName = 'Please enter a valid name (2-50 characters, letters only)';
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePasswordStrength(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.feedback.join(', ');
    }
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt || now > attempt.resetTime) {
      // Reset or create new attempt
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    attempt.count++;
    return true;
  }

  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return this.maxAttempts;
    return Math.max(0, this.maxAttempts - attempt.count);
  }

  getResetTime(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    return attempt ? attempt.resetTime : 0;
  }
}

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken && token.length > 0;
};

// Input sanitization for all form fields
export const sanitizeFormInput = (input: any, type: 'text' | 'email' | 'number' | 'date'): any => {
  if (input === null || input === undefined) return input;
  
  switch (type) {
    case 'text':
      return typeof input === 'string' ? sanitizeHtml(input) : '';
    case 'email':
      return typeof input === 'string' ? input.toLowerCase().trim() : '';
    case 'number':
      return typeof input === 'number' ? input : 0;
    case 'date':
      return typeof input === 'string' ? input : '';
    default:
      return input;
  }
}; 