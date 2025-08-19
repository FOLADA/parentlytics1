import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Utensils, Apple, Sun, Moon, Carrot, Coffee } from 'lucide-react';

interface MealCardProps {
  title: string;
  meal: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack1' | 'snack2';
  index: number;
}

const mealTypeConfig: Record<string, {
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
}> = {
  breakfast: {
    icon: <Sun className="w-6 h-6 text-purple-500" />,
    color: 'bg-white',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  },
  lunch: {
    icon: <Sun className="w-6 h-6 text-purple-500" />,
    color: 'bg-white',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  },
  dinner: {
    icon: <Moon className="w-6 h-6 text-purple-500" />,
    color: 'bg-white',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  },
  snack1: {
    icon: <Coffee className="w-6 h-6 text-purple-500" />,
    color: 'bg-white',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  },
  snack2: {
    icon: <Carrot className="w-6 h-6 text-purple-500" />,
    color: 'bg-white',
    borderColor: 'border-blue-200',
    bgColor: 'bg-blue-50'
  }
};

export default function MealCard({ title, meal, mealType, index }: MealCardProps) {
  const config = mealTypeConfig[mealType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl border-2 ${config.borderColor} ${config.color} p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Utensils className="w-4 h-4" />
          <span>{meal.calories} კალ</span> {/* Changed cal to კალ */}
        </div>
      </div>

      {/* Meal Name */}
      <h4 className="text-xl font-bold text-gray-900 mb-3">{meal.name}</h4>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed">{meal.description}</p>

      {/* Ingredients */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Apple className="w-4 h-4" />
          <span>ინგრედიენტები:</span> {/* Changed Ingredients: */}
        </div>
        <div className="flex flex-wrap gap-2">
          {meal.ingredients.map((ingredient, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} text-gray-700 border border-gray-200`}
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <div className={`w-full h-full rounded-full ${config.bgColor}`}></div>
      </div>
    </motion.div>
  );
}