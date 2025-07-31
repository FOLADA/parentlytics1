'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RefreshCw, ShoppingCart, Heart, AlertCircle, User } from 'lucide-react';
import MealCard from '../../components/MealCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import ChildForm from '../../components/ChildForm';
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
  const { user, childProfile, updateChildProfile } = useAuth();

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
      
      let mockMealPlan: MealPlan;
      
      if (childAge < 6) {
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
      } else if (childAge < 12) {
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
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

  if (error && !todayMeal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Oops! No meal plan found</h2>
            <p className="text-gray-600">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generateMealPlanNow}
                disabled={generating}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Generate Today's Meal Plan
                  </>
                )}
              </button>
              <button
                onClick={() => setShowProfileSetup(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                <User className="w-4 h-4" />
                Set Up Child Profile
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Safety Warning for Young Babies */}
        {childAge < 0.5 && (
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
        {childAge >= 0.5 && childAge < 1 && (
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
            <Calendar className="w-8 h-8 text-orange-500" />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors disabled:opacity-50"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Grocery List
          </button>

          <button
            onClick={() => setShowProfileSetup(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
          >
            <User className="w-4 h-4" />
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
            transition={{ delay: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-800">Today's Nutrition Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {todayMeal.meal_plan.total_calories}
                  </div>
                  <div className="text-sm text-gray-600">Total Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">5</div>
                  <div className="text-sm text-gray-600">Meals & Snacks</div>
                </div>
              </div>
              {todayMeal.meal_plan.nutrition_notes && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">{todayMeal.meal_plan.nutrition_notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Child Profile Setup Modal */}
        {showProfileSetup && (
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
              health_notes: childProfile.health_notes,
            } : undefined}
          />
        )}
      </div>
    </div>
  );
}
