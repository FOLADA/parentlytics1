import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChefHat, Apple } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

export default function LoadingIndicator({ message = "Creating your personalized meal plan..." }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 -mt-24">
      {/* Animated icons */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <Loader2 className="w-full h-full text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <ChefHat className="w-8 h-8 text-blue-400" />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-2"
      >
        <h3 className="text-xl font-semibold text-gray-800">{message}</h3>
        <p className="text-gray-600">Our AI nutritionist is crafting the perfect meals for your child...</p>
      </motion.div>

      {/* Animated dots */}
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
            className="w-3 h-3 bg-blue-400 rounded-full"
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-2xl opacity-20"
        >
          🍎
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-2xl opacity-20"
        >
          🥕
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4 text-2xl opacity-20"
        >
          🥛
        </motion.div>
      </div>
    </div>
  );
} 