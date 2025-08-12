'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Zap, 
  Droplets, 
  Apple, 
  Beef, 
  Wheat 
} from 'lucide-react';

interface NutritionChartProps {
  totalCalories: number;
  targetCalories: number;
  nutritionData: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  childAgeInMonths: number;
}

export default function NutritionChart({ 
  totalCalories, 
  targetCalories, 
  nutritionData, 
  childAgeInMonths 
}: NutritionChartProps) {
  const caloriePercentage = Math.min((totalCalories / targetCalories) * 100, 100);
  const proteinPercentage = Math.min((nutritionData.protein / 25) * 100, 100); // 25g target for toddlers
  const carbsPercentage = Math.min((nutritionData.carbs / 130) * 100, 100); // 130g target
  const fatPercentage = Math.min((nutritionData.fat / 30) * 100, 100); // 30g target

  const getCalorieColor = (percentage: number) => {
    if (percentage < 70) return 'text-red-500';
    if (percentage < 90) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getMacroColor = (percentage: number) => {
    if (percentage < 60) return 'text-blue-500';
    if (percentage < 80) return 'text-blue-400';
    return 'text-blue-300';
  };

  const getAgeBasedTargets = () => {
    if (childAgeInMonths < 6) {
      return { calories: 540, protein: 0, carbs: 0, fat: 0 };
    } else if (childAgeInMonths < 12) {
      return { calories: 610, protein: 10, carbs: 60, fat: 20 };
    } else {
      return { calories: 1270, protein: 25, carbs: 130, fat: 30 };
    }
  };

  const targets = getAgeBasedTargets();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-gray-800">Today's Nutrition Summary</h3>
      </div>

      {/* Main Stats Grid - Three Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Meals */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">5</div>
              <div className="text-sm text-gray-600">Total Meals</div>
              <div className="text-xs text-purple-600">+2 from yesterday</div>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Total Volume */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">{Math.round(totalCalories * 0.8)}ml</div>
              <div className="text-sm text-gray-600">Total Volume</div>
              <div className="text-xs text-purple-600">{Math.round(caloriePercentage)}% of norm</div>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Calories */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">{totalCalories} kcal</div>
              <div className="text-sm text-gray-600">Calories</div>
              <div className="text-xs text-purple-600">Within norm</div>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals Progress */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-purple-500" />
          <h4 className="text-lg font-semibold text-gray-800">Daily Goals</h4>
        </div>
        
        {/* Milk Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Milk</span>
            <span className="text-sm text-gray-500">{Math.round(totalCalories * 0.8)}/750ml</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalCalories * 0.8 / 750) * 100, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-3 rounded-full bg-blue-500"
            />
          </div>
        </div>

        {/* Solid Food Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Solid Food</span>
            <span className="text-sm text-gray-500">{Math.round(totalCalories * 0.15)}/250g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalCalories * 0.15 / 250) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-3 rounded-full bg-blue-500"
            />
          </div>
        </div>

        {/* Water Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Water</span>
            <span className="text-sm text-gray-500">50/100ml</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-3 rounded-full bg-blue-500"
            />
          </div>
        </div>
      </div>



      {/* Age-based Warning */}
      {childAgeInMonths < 6 && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>IMPORTANT:</strong> Babies under 6 months should ONLY consume breast milk or infant formula. 
            Do not introduce solid foods without consulting your pediatrician.
          </p>
        </div>
      )}

      {childAgeInMonths >= 6 && childAgeInMonths < 12 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> In ages 6-12 months, primary nutrition should still be breast milk or formula. 
            Solid foods are complementary and should be introduced gradually.
          </p>
        </div>
      )}

      {/* Success Message for Older Children */}
      {childAgeInMonths >= 12 && caloriePercentage >= 80 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-green-700">
              <strong>Great job!</strong> Your child is meeting their daily nutrition goals. 
              Keep up the balanced diet!
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 