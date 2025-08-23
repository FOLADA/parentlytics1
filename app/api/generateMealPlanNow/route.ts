import { NextRequest, NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/openai';
import { getChildProfile, createDailyMeal } from '@/lib/supabase';
import { generateFallbackMealPlan, generateMockMealPlan } from '@/lib/mealPlanFallback';
import { ApiResponse, GenerateMealPlanResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    console.log('generateMealPlanNow API called');
    
    // Get user ID from the request (you'll need to implement authentication)
    const userId = 'mock-user-id'; // Replace with actual user authentication
    
    console.log('Getting child profile for user:', userId);
    
    // Get child profile
    const childProfile = await getChildProfile(userId);
    
    if (!childProfile) {
      console.log('Child profile not found');
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Child profile not found. Please set up your child\'s profile first.'
      }, { status: 404 });
    }

    console.log('Child profile found:', childProfile.name);

    // Try to generate meal plan using OpenAI first
    let mealPlan;
    try {
      console.log('Attempting to generate meal plan with OpenAI...');
      mealPlan = await generateMealPlan(childProfile);
      console.log('Meal plan generated successfully with OpenAI');
    } catch (openaiError) {
      console.log('OpenAI failed, using fallback meal plan:', openaiError);
      // Use fallback meal plan based on child's age
      mealPlan = generateFallbackMealPlan(childProfile);
      console.log('Fallback meal plan generated successfully');
    }
    
    // Try to save to database, but don't fail if it doesn't work
    let dailyMeal = null;
    try {
      const today = new Date().toISOString().split('T')[0];
      console.log('Attempting to save meal plan to database for date:', today);
      
      dailyMeal = await createDailyMeal({
        user_id: userId,
        child_id: childProfile.id,
        date: today,
        meal_plan: mealPlan
      });

      if (dailyMeal) {
        console.log('Meal plan saved successfully to database');
      } else {
        console.log('Failed to save meal plan to database, but continuing');
      }
    } catch (dbError) {
      console.log('Database save failed, but continuing:', dbError);
    }

    return NextResponse.json<ApiResponse<GenerateMealPlanResponse>>({
      success: true,
      data: {
        mealPlan
      }
    });

  } catch (error) {
    console.error('Error in /api/generateMealPlanNow:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to generate meal plan'
    }, { status: 500 });
  }
} 