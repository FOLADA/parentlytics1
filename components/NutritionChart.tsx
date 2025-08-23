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
  nutritionData: any;
  childAgeInMonths: number;
}

export default function NutritionChart({ 
  totalCalories, 
  targetCalories, 
  nutritionData, 
  childAgeInMonths 
}: NutritionChartProps) {
  // Calculate calorie percentage
  const caloriePercentage = targetCalories > 0 ? (totalCalories / targetCalories) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-gray-800">დღევანდელი კვების შეჯამება</h3>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Meals */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">5</div>
              <div className="text-sm text-gray-600">სულ კვება</div>
              <div className="text-xs text-purple-600">+2 გუშინდელთან შედარებით</div>
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
              <div className="text-sm text-gray-600">სულ მოცულობა</div>
              <div className="text-xs text-purple-600">{Math.round(caloriePercentage)}% ნორმის</div>
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
              <div className="text-2xl font-bold text-gray-800">{totalCalories} კკალ</div>
              <div className="text-sm text-gray-600">კალორიები</div>
              <div className="text-xs text-purple-600">ნორმის ფარგლებში</div>
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
          <h4 className="text-lg font-semibold text-gray-800">დღიური მიზნები</h4>
        </div>
        
        {/* Milk Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">რძე</span>
            <span className="text-sm text-gray-500">{Math.round(totalCalories * 0.8)}/750ml</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((totalCalories * 0.8 / 750) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Solid Food Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">მყარი საკვები</span>
            <span className="text-sm text-gray-500">{Math.round(totalCalories * 0.15)}/250გ</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((totalCalories * 0.15 / 250) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Water Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">წყალი</span>
            <span className="text-sm text-gray-500">50/100მლ</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((50 / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Age-based Warning */}
      {childAgeInMonths < 6 && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-700">
            <strong>მნიშვნელოვანია:</strong> 6 თვემდე ბავშვებმა მხოლოდ დედის რძე ან ბავშვის ფორმულა უნდა მიიღონ. 
            მყარი საკვების შემოღება პედიატრთან კონსულტაციის გარეშე არ შეიძლება.
          </p>
        </div>
      )}

      {childAgeInMonths >= 6 && childAgeInMonths < 12 && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700">
            <strong>შენიშვნა:</strong> 6-12 თვის ასაკში ძირითადი კვება ჯერ კიდევ დედის რძე ან ფორმულა უნდა იყოს. 
            მყარი საკვები დამატებითია და ნელ-ნელა უნდა იყოს შემოღებული.
          </p>
        </div>
      )}

      {/* Success Message */}
      {childAgeInMonths >= 12 && caloriePercentage >= 80 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <p className="text-sm text-green-700">
              <strong>შესანიშნავია!</strong> თქვენი ბავშვი აღწევს დღიურ კვებრივ მიზნებს. 
              განაგრძეთ დაბალანსებული კვება!
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 