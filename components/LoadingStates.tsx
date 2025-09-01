import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChefHat, Apple, Heart, Brain, User, Utensils } from 'lucide-react';

export type LoadingType = 
  | 'meal-plan' 
  | 'profile' 
  | 'auth' 
  | 'ai-chat' 
  | 'general' 
  | 'skeleton';

interface LoadingStatesProps {
  type?: LoadingType;
  message?: string;
  size?: 'small' | 'medium' | 'large';
  showProgress?: boolean;
  progress?: number;
}

export default function LoadingStates({ 
  type = 'general', 
  message, 
  size = 'medium',
  showProgress = false,
  progress = 0
}: LoadingStatesProps) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const getLoadingContent = () => {
    switch (type) {
      case 'meal-plan':
        return {
          icon: <ChefHat className={`${iconSizes[size]} text-blue-500`} />,
          primaryMessage: message || "თქვენი პერსონალიზებული კვების გეგმის შექმნა...",
          secondaryMessage: "ჩვენი AI ნუტრიციოლოგი ქმნის სრულყოფილ კერძებს თქვენი ბავშვისთვის...",
          accentColor: "text-blue-500",
          bgColor: "bg-blue-500"
        };
      
      case 'profile':
        return {
          icon: <User className={`${iconSizes[size]} text-purple-500`} />,
          primaryMessage: message || "პროფილის განახლება...",
          secondaryMessage: "თქვენი ბავშვის ინფორმაცია ინახება...",
          accentColor: "text-purple-500",
          bgColor: "bg-purple-500"
        };
      
      case 'auth':
        return {
          icon: <Heart className={`${iconSizes[size]} text-red-500`} />,
          primaryMessage: message || "ავტორიზაცია...",
          secondaryMessage: "თქვენი ანგარიში მოწმდება...",
          accentColor: "text-red-500",
          bgColor: "bg-red-500"
        };
      
      case 'ai-chat':
        return {
          icon: <Brain className={`${iconSizes[size]} text-indigo-500`} />,
          primaryMessage: message || "AI ფიქრობს...",
          secondaryMessage: "ჩვენი ექსპერტი მზადებს პასუხს...",
          accentColor: "text-indigo-500",
          bgColor: "bg-indigo-500"
        };
      
      case 'general':
      default:
        return {
          icon: <Loader2 className={`${iconSizes[size]} text-gray-500`} />,
          primaryMessage: message || "იტვირთება...",
          secondaryMessage: "გთხოვთ დაელოდოთ...",
          accentColor: "text-gray-500",
          bgColor: "bg-gray-500"
        };
    }
  };

  const content = getLoadingContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {/* Animated Icon */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={sizeClasses[size]}
        >
          <Loader2 className={`w-full h-full ${content.accentColor}`} />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {content.icon}
        </motion.div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full max-w-xs">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${content.bgColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
        </div>
      )}

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-2"
      >
        <h3 className={`text-lg md:text-xl font-semibold text-gray-800`}>
          {content.primaryMessage}
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          {content.secondaryMessage}
        </p>
      </motion.div>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
            className={`w-2 h-2 ${content.bgColor} rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton Loading Component
export function SkeletonLoader({ 
  type = 'card',
  count = 1 
}: { 
  type?: 'card' | 'text' | 'button';
  count?: number;
}) {
  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'bg-gray-200 rounded-lg h-32';
      case 'text':
        return 'bg-gray-200 rounded h-4';
      case 'button':
        return 'bg-gray-200 rounded h-10 w-24';
      default:
        return 'bg-gray-200 rounded h-4';
    }
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          className={getSkeletonClass()}
        />
      ))}
    </div>
  );
}

// Inline Loading Component
export function InlineLoader({ 
  size = 'small',
  message 
}: { 
  size?: 'small' | 'medium';
  message?: string;
}) {
  const sizeClasses = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={`${sizeClasses} text-blue-500`} />
      </motion.div>
      {message && (
        <span className="text-sm text-gray-600">{message}</span>
      )}
    </div>
  );
} 