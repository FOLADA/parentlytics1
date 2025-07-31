import { NextRequest, NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/openai';
import { getChildProfile, createDailyMeal } from '@/lib/supabase';
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

    // Generate meal plan using OpenAI
    console.log('Generating meal plan with OpenAI...');
    const mealPlan = await generateMealPlan(childProfile);
    
    console.log('Meal plan generated successfully');
    
    // Save to database
    const today = new Date().toISOString().split('T')[0];
    console.log('Saving meal plan to database for date:', today);
    
    const dailyMeal = await createDailyMeal({
      user_id: userId,
      child_id: childProfile.id,
      date: today,
      meal_plan: mealPlan
    });

    if (!dailyMeal) {
      console.log('Failed to save meal plan to database');
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Failed to save meal plan to database'
      }, { status: 500 });
    }

    console.log('Meal plan saved successfully');

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