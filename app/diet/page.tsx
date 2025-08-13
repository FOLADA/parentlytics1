'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw, ShoppingCart, Heart, AlertCircle, User, Utensils, Apple, Carrot, Coffee, Milk, Wheat, Banana, Grape, Fish, Egg, Circle, Square, Triangle } from 'lucide-react';
import MealCard from '../../components/MealCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import ChildForm from '../../components/ChildForm';
import BLWExpandedCards from '../../components/BLWExpandedCards';
import NutritionChart from '../../components/NutritionChart';
import { useAuth } from '@/context/ChildContext';
import { DailyMeal, MealPlan, ChildProfileFormData } from '../../lib/types';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function DietPage() {
  const [todayMeal, setTodayMeal] = useState<DailyMeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [blwExpanded, setBlwExpanded] = useState(false);
  const { user, childProfile, updateChildProfile } = useAuth();
  const profileFormRef = useRef<HTMLDivElement>(null);



  // Use child name from context
  const childName = childProfile?.name || '';

  useEffect(() => {
    fetchTodayMeal();
  }, []);



  const fetchTodayMeal = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/diet/today');
      const result: ApiResponse<DailyMeal> = await response.json();
      
      if (result.success && result.data) {
        setTodayMeal(result.data);
      } else {
        setError(result.error || 'No meal plan found for today');
      }
    } catch (err) {
      setError('Failed to fetch today\'s meal plan');
      console.error('Error fetching meal:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateMealPlanNow = async () => {
    try {
      setGenerating(true);
      setError(null);
      
      // First try the API route
      try {
        const response = await fetch('/api/generateMealPlanNow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const result: ApiResponse<{ mealPlan: MealPlan }> = await response.json();
          
          if (result.success && result.data) {
            // Create a mock daily meal object
            const newDailyMeal: DailyMeal = {
              id: 'generated-' + Date.now(),
              user_id: 'mock-user-id',
              child_id: 'mock-child-id',
              date: new Date().toISOString().split('T')[0],
              meal_plan: result.data.mealPlan,
              created_at: new Date().toISOString(),
            };
            
            setTodayMeal(newDailyMeal);
            return;
          } else {
            setError(result.error || 'Failed to generate meal plan');
            return;
          }
        }
      } catch (apiError) {
        console.log('API route failed, using fallback:', apiError);
      }
      
      // Fallback: Create a mock meal plan if API fails
      console.log('Using fallback meal plan generation');
      
      // Get child's age to determine appropriate meal plan
      const childAge = childProfile ? 
        Math.floor((new Date().getTime() - new Date(childProfile.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : 
        0;
      
      // Calculate age in months for more precise meal planning
      const childAgeInMonths = childProfile ? 
        Math.floor((new Date().getTime() - new Date(childProfile.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)) : 
        0;
      
      let mockMealPlan: MealPlan;
      
      if (childAgeInMonths < 6) {
        // For babies under 6 months - breast milk/formula only
        mockMealPlan = {
          breakfast: {
            name: "Breast Milk or Formula",
            description: "Morning feeding - approximately 4-6 ounces",
            calories: 120,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          snack1: {
            name: "Breast Milk or Formula",
            description: "Mid-morning feeding - approximately 3-4 ounces",
            calories: 90,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          lunch: {
            name: "Breast Milk or Formula",
            description: "Afternoon feeding - approximately 4-6 ounces",
            calories: 120,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          snack2: {
            name: "Breast Milk or Formula",
            description: "Mid-afternoon feeding - approximately 3-4 ounces",
            calories: 90,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          dinner: {
            name: "Breast Milk or Formula",
            description: "Evening feeding - approximately 4-6 ounces",
            calories: 120,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          total_calories: 540,
          nutrition_notes: "IMPORTANT: Babies under 6 months should ONLY consume breast milk or infant formula. Do not introduce solid foods without consulting your pediatrician."
        };
      } else if (childAgeInMonths < 12) {
        // For babies 6-12 months - some solids introduced
        mockMealPlan = {
          breakfast: {
            name: "Breast Milk/Formula + Baby Cereal",
            description: "Morning feeding with iron-fortified baby cereal",
            calories: 150,
            ingredients: ["breast milk", "or", "infant formula", "iron-fortified baby cereal"]
          },
          snack1: {
            name: "Breast Milk or Formula",
            description: "Mid-morning feeding",
            calories: 90,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          lunch: {
            name: "Breast Milk/Formula + Pureed Vegetables",
            description: "Afternoon feeding with pureed vegetables",
            calories: 140,
            ingredients: ["breast milk", "or", "infant formula", "pureed vegetables"]
          },
          snack2: {
            name: "Breast Milk or Formula",
            description: "Mid-afternoon feeding",
            calories: 90,
            ingredients: ["breast milk", "or", "infant formula"]
          },
          dinner: {
            name: "Breast Milk/Formula + Pureed Fruits",
            description: "Evening feeding with pureed fruits",
            calories: 140,
            ingredients: ["breast milk", "or", "infant formula", "pureed fruits"]
          },
          total_calories: 610,
          nutrition_notes: "Consult your pediatrician before introducing solid foods. Start with single-ingredient purees and introduce new foods one at a time."
        };
      } else {
        // For toddlers 1+ years - more varied diet
        mockMealPlan = {
          breakfast: {
            name: "Healthy Oatmeal with Berries",
            description: "Warm oatmeal topped with fresh berries and a drizzle of honey",
            calories: 250,
            ingredients: ["oats", "milk", "berries", "honey", "cinnamon"]
          },
          snack1: {
            name: "Apple Slices with Peanut Butter",
            description: "Fresh apple slices served with natural peanut butter",
            calories: 120,
            ingredients: ["apple", "peanut butter"]
          },
          lunch: {
            name: "Grilled Chicken with Vegetables",
            description: "Grilled chicken breast with steamed broccoli and carrots",
            calories: 350,
            ingredients: ["chicken breast", "broccoli", "carrots", "olive oil", "salt"]
          },
          snack2: {
            name: "Greek Yogurt with Granola",
            description: "Creamy Greek yogurt topped with crunchy granola",
            calories: 150,
            ingredients: ["greek yogurt", "granola", "honey"]
          },
          dinner: {
            name: "Salmon with Rice and Peas",
            description: "Baked salmon fillet with brown rice and green peas",
            calories: 400,
            ingredients: ["salmon", "brown rice", "peas", "lemon", "herbs"]
          },
          total_calories: 1270,
          nutrition_notes: "This meal plan provides a balanced mix of protein, healthy fats, and complex carbohydrates suitable for a growing child."
        };
      }
      
      const newDailyMeal: DailyMeal = {
        id: 'generated-' + Date.now(),
        user_id: 'mock-user-id',
        child_id: 'mock-child-id',
        date: new Date().toISOString().split('T')[0],
        meal_plan: mockMealPlan,
        created_at: new Date().toISOString(),
      };
      
      setTodayMeal(newDailyMeal);
      
    } catch (err) {
      setError('Failed to generate meal plan');
      console.error('Error generating meal:', err);
    } finally {
      setGenerating(false);
    }
  };

  const generateGroceryList = () => {
    if (!todayMeal) return;
    
    const allIngredients = [
      ...todayMeal.meal_plan.breakfast.ingredients,
      ...todayMeal.meal_plan.snack1.ingredients,
      ...todayMeal.meal_plan.lunch.ingredients,
      ...todayMeal.meal_plan.snack2.ingredients,
      ...todayMeal.meal_plan.dinner.ingredients,
    ];
    
    const uniqueIngredients = [...new Set(allIngredients)];
    const groceryList = uniqueIngredients.join('\n• ');
    
    // Create and download grocery list
    const blob = new Blob([`Grocery List for ${childName}'s Meals Today:\n\n• ${groceryList}`], {
      type: 'text/plain',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grocery-list-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  // Calculate child's age for safety warnings
  const childAge = childProfile ? 
    Math.floor((new Date().getTime() - new Date(childProfile.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 365.25)) : 
    0;
  
  // Calculate age in months for more precise BLW calculations
  const childAgeInMonths = childProfile ? 
    Math.floor((new Date().getTime() - new Date(childProfile.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)) : 
    0;
  
  // Debug logging
  console.log('Child age in years:', childAge);
  console.log('Child age in months:', childAgeInMonths);
  console.log('Child profile:', childProfile);

  if (error && !todayMeal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl text-center space-y-6 -mt-24"
        >
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Oops! No meal plan found</h2>
            <p className="text-gray-600">{error}</p>
            <div className="flex justify-center">
              <button
                onClick={generateMealPlanNow}
                disabled={generating}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Generate Today's Meal Plan
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Floating Food Icons Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Section Icons (0-20%) */}
        <div className="absolute top-16 left-8 text-purple-800">
          <Apple className="w-10 h-10 animate-float-food-1" />
        </div>
        <div className="absolute top-24 left-20 text-purple-800">
          <Carrot className="w-8 h-8 animate-float-food-2" />
        </div>
        <div className="absolute top-32 left-32 text-purple-800">
          <Coffee className="w-9 h-9 animate-float-food-3" />
        </div>
        <div className="absolute top-20 right-16 text-purple-800">
          <Wheat className="w-8 h-8 animate-float-food-4" />
        </div>
        <div className="absolute top-28 right-28 text-purple-800">
          <Grape className="w-6 h-6 animate-float-food-5" />
        </div>
        <div className="absolute top-36 left-1/2 text-purple-800">
          <Banana className="w-7 h-7 animate-float-food-1" />
        </div>
        <div className="absolute top-44 left-1/4 text-purple-800">
          <Fish className="w-6 h-6 animate-float-food-2" />
        </div>
        <div className="absolute top-52 right-1/3 text-purple-800">
          <Egg className="w-5 h-5 animate-float-food-3" />
        </div>
        
        {/* Upper Middle Section Icons (20-40%) */}
        <div className="absolute top-1/5 left-12 text-purple-800">
          <Milk className="w-8 h-8 animate-float-food-4" />
        </div>
        <div className="absolute top-1/5 right-12 text-purple-800">
          <Circle className="w-6 h-6 animate-float-food-5" />
        </div>
        <div className="absolute top-1/5 left-2/3 text-purple-800">
          <Square className="w-7 h-7 animate-float-food-1" />
        </div>
        <div className="absolute top-1/5 right-2/3 text-purple-800">
          <Triangle className="w-5 h-5 animate-float-food-2" />
        </div>
        <div className="absolute top-1/5 left-1/3 text-purple-800">
          <Apple className="w-6 h-6 animate-float-food-3" />
        </div>
        <div className="absolute top-1/5 right-1/3 text-purple-800">
          <Carrot className="w-5 h-5 animate-float-food-4" />
        </div>
        
        {/* Middle Section Icons (40-60%) */}
        <div className="absolute top-2/5 left-16 text-purple-800">
          <Coffee className="w-9 h-9 animate-float-food-5" />
        </div>
        <div className="absolute top-2/5 right-16 text-purple-800">
          <Wheat className="w-8 h-8 animate-float-food-1" />
        </div>
        <div className="absolute top-2/5 left-1/2 text-purple-800">
          <Banana className="w-7 h-7 animate-float-food-2" />
        </div>
        <div className="absolute top-2/5 right-1/2 text-purple-800">
          <Fish className="w-6 h-6 animate-float-food-3" />
        </div>
        <div className="absolute top-2/5 left-1/4 text-purple-800">
          <Egg className="w-5 h-5 animate-float-food-4" />
        </div>
        <div className="absolute top-2/5 right-1/4 text-purple-800">
          <Milk className="w-6 h-6 animate-float-food-5" />
        </div>
        <div className="absolute top-2/5 left-3/4 text-purple-800">
          <Grape className="w-5 h-5 animate-float-food-1" />
        </div>
        <div className="absolute top-2/5 right-3/4 text-purple-800">
          <Circle className="w-4 h-4 animate-float-food-2" />
        </div>
        
        {/* Lower Middle Section Icons (60-80%) */}
        <div className="absolute top-3/5 left-20 text-purple-800">
          <Apple className="w-8 h-8 animate-float-food-3" />
        </div>
        <div className="absolute top-3/5 right-20 text-purple-800">
          <Carrot className="w-7 h-7 animate-float-food-4" />
        </div>
        <div className="absolute top-3/5 left-1/3 text-purple-800">
          <Coffee className="w-6 h-6 animate-float-food-5" />
        </div>
        <div className="absolute top-3/5 right-1/3 text-purple-800">
          <Wheat className="w-5 h-5 animate-float-food-1" />
        </div>
        <div className="absolute top-3/5 left-1/2 text-purple-800">
          <Banana className="w-6 h-6 animate-float-food-2" />
        </div>
        <div className="absolute top-3/5 right-1/2 text-purple-800">
          <Fish className="w-5 h-5 animate-float-food-3" />
        </div>
        <div className="absolute top-3/5 left-2/3 text-purple-800">
          <Egg className="w-4 h-4 animate-float-food-4" />
        </div>
        <div className="absolute top-3/5 right-2/3 text-purple-800">
          <Milk className="w-5 h-5 animate-float-food-5" />
        </div>
        
        {/* Bottom Section Icons (80-100%) */}
        <div className="absolute top-4/5 left-12 text-purple-800">
          <Grape className="w-7 h-7 animate-float-food-1" />
        </div>
        <div className="absolute top-4/5 right-12 text-purple-800">
          <Circle className="w-6 h-6 animate-float-food-2" />
        </div>
        <div className="absolute top-4/5 left-1/4 text-purple-800">
          <Square className="w-5 h-5 animate-float-food-3" />
        </div>
        <div className="absolute top-4/5 right-1/4 text-purple-800">
          <Triangle className="w-4 h-4 animate-float-food-4" />
        </div>
        <div className="absolute top-4/5 left-1/2 text-purple-800">
          <Apple className="w-6 h-6 animate-float-food-5" />
        </div>
        <div className="absolute top-4/5 right-1/2 text-purple-800">
          <Carrot className="w-5 h-5 animate-float-food-1" />
        </div>
        <div className="absolute top-4/5 left-3/4 text-purple-800">
          <Coffee className="w-4 h-4 animate-float-food-2" />
        </div>
        <div className="absolute top-4/5 right-3/4 text-purple-800">
          <Wheat className="w-5 h-5 animate-float-food-3" />
        </div>
        
        {/* Very Bottom Section Icons (90-100%) */}
        <div className="absolute top-11/12 left-16 text-purple-800">
          <Banana className="w-5 h-5 animate-float-food-4" />
        </div>
        <div className="absolute top-11/12 right-16 text-purple-800">
          <Fish className="w-4 h-4 animate-float-food-5" />
        </div>
        <div className="absolute top-11/12 left-1/3 text-purple-800">
          <Egg className="w-3 h-3 animate-float-food-1" />
        </div>
        <div className="absolute top-11/12 right-1/3 text-purple-800">
          <Milk className="w-4 h-4 animate-float-food-2" />
        </div>
        <div className="absolute top-11/12 left-2/3 text-purple-800">
          <Grape className="w-3 h-3 animate-float-food-3" />
        </div>
        <div className="absolute top-11/12 right-2/3 text-purple-800">
          <Circle className="w-4 h-4 animate-float-food-4" />
        </div>
        
        {/* Scattered Additional Icons */}
        <div className="absolute top-1/6 left-1/6 text-purple-800">
          <Square className="w-4 h-4 animate-float-food-5" />
        </div>
        <div className="absolute top-1/6 right-1/6 text-purple-800">
          <Triangle className="w-3 h-3 animate-float-food-1" />
        </div>
        <div className="absolute top-5/6 left-1/6 text-purple-800">
          <Apple className="w-4 h-4 animate-float-food-2" />
        </div>
        <div className="absolute top-5/6 right-1/6 text-purple-800">
          <Carrot className="w-3 h-3 animate-float-food-3" />
        </div>
        <div className="absolute top-1/3 left-1/6 text-purple-800">
          <Coffee className="w-5 h-5 animate-float-food-4" />
        </div>
        <div className="absolute top-2/3 right-1/6 text-purple-800">
          <Wheat className="w-4 h-4 animate-float-food-5" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-20">
        {/* Safety Warning for Young Babies */}
        {childAgeInMonths < 6 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-red-500 flex-shrink-0">⚠️</div>
                <div>
                  <h3 className="font-semibold text-red-800">Important Safety Notice</h3>
                  <p className="text-red-700 text-sm mt-1">
                    Your baby is under 6 months old. They should ONLY consume breast milk or infant formula. 
                    Do not introduce solid foods without consulting your pediatrician.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Safety Warning for 6-12 Month Olds */}
        {childAgeInMonths >= 6 && childAgeInMonths < 12 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-yellow-500 flex-shrink-0">⚠️</div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Feeding Guidelines</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    Your baby is 6-12 months old. Primary nutrition should still be breast milk or formula. 
                    Solid foods should be introduced gradually with pediatrician guidance. Avoid honey, cow's milk, and choking hazards.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              {childName ? `მოდი კარგად გამოვკვებოთ ${childName}?` : 'მოდი კარგად გამოვკვებოთ ბავშვს?'} 🍽️
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Включает рекомендации по BLW (Baby-Led Weaning) для детей 6+ месяцев
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={generateMealPlanNow}
            disabled={generating}
            className="purple-gradient-btn inline-flex items-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Refresh Plan
              </>
            )}
          </button>
          
          <button
            onClick={generateGroceryList}
            className="purple-gradient-btn inline-flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Grocery List
          </button>

          <button
            onClick={() => {
              setShowProfileSetup(true);
              
              // Scroll to form after a short delay to ensure it's rendered
              setTimeout(() => {
                if (profileFormRef.current) {
                  profileFormRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }, 100);
            }}
            className="purple-gradient-btn inline-flex items-center gap-2"
          >
            <User className="w-5 h-5" />
            Edit Profile
          </button>
        </motion.div>



        {/* Meal Cards Grid */}
        {todayMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            <MealCard
              title="Breakfast"
              meal={todayMeal.meal_plan.breakfast}
              mealType="breakfast"
              index={0}
            />
            <MealCard
              title="Morning Snack"
              meal={todayMeal.meal_plan.snack1}
              mealType="snack1"
              index={1}
            />
            <MealCard
              title="Lunch"
              meal={todayMeal.meal_plan.lunch}
              mealType="lunch"
              index={2}
            />
            <MealCard
              title="Afternoon Snack"
              meal={todayMeal.meal_plan.snack2}
              mealType="snack2"
              index={3}
            />
            <MealCard
              title="Dinner"
              meal={todayMeal.meal_plan.dinner}
              mealType="dinner"
              index={4}
            />

          </motion.div>
        )}

        {/* Nutrition Summary */}
        {todayMeal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-7xl mx-auto"
          >
            <NutritionChart
              totalCalories={todayMeal.meal_plan.total_calories}
              targetCalories={childAgeInMonths < 6 ? 540 : childAgeInMonths < 12 ? 610 : 1270}
              nutritionData={{
                protein: Math.round(todayMeal.meal_plan.total_calories * 0.15 / 4), // 15% of calories from protein
                carbs: Math.round(todayMeal.meal_plan.total_calories * 0.55 / 4), // 55% of calories from carbs
                fat: Math.round(todayMeal.meal_plan.total_calories * 0.30 / 9), // 30% of calories from fat
                fiber: Math.round(todayMeal.meal_plan.total_calories * 0.014), // 14g per 1000 calories
                sugar: Math.round(todayMeal.meal_plan.total_calories * 0.1 / 4), // 10% of calories from sugar
                sodium: 800 // Default sodium value
              }}
              childAgeInMonths={childAgeInMonths}
            />
          </motion.div>
        )}

        {/* BLW Brief Mention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-7xl mx-auto"
        >
          <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Utensils className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Want to try the BLW method?</h3>
            </div>
            <p className="text-gray-600 mb-3">
              Baby Led Weaning (BLW) is a method of introducing complementary foods, in which the child independently eats solid food. 
              Great for children from 6 months!
            </p>
            <p className="text-sm text-gray-500">
              📍 Scroll down to see detailed recommendations, recipes and a step-by-step implementation plan.
            </p>
          </div>
        </motion.div>

        {/* BLW Expanded Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 max-w-7xl mx-auto"
        >
          <BLWExpandedCards
            childAgeInMonths={childAgeInMonths}
            isExpanded={blwExpanded}
            onToggle={() => setBlwExpanded(!blwExpanded)}
          />
        </motion.div>

                {/* Child Profile Setup Modal */}
        {showProfileSetup && (
          <motion.div 
            ref={profileFormRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-8"
          >
            <ChildForm
              onSubmit={async (data: ChildProfileFormData) => {
                try {
                  await updateChildProfile(data);
                  setShowProfileSetup(false);
                } catch (error) {
                  console.error('Error updating child profile:', error);
                }
              }}
              onCancel={() => setShowProfileSetup(false)}
              isEditing={!!childProfile}
              initialData={childProfile ? {
                name: childProfile.name,
                birthdate: childProfile.birthdate,
                gender: childProfile.gender,
                weight: childProfile.weight,
                height: childProfile.height,
                activity_level: childProfile.activity_level,
                allergies: childProfile.allergies,
                other_health_concerns: childProfile.other_health_concerns,
              } : undefined}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
