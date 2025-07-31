import { NextRequest, NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/openai';
import { getAllChildProfiles, createDailyMeal } from '@/lib/supabase';
import { ApiResponse } from '@/lib/types';

// This endpoint will be called by Vercel Cron or Supabase Edge Function Scheduler
// at 12:00 AM every day to generate meal plans for all users
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a legitimate cron service
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET_TOKEN;
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Get all child profiles (in a real app, you'd get all users and their children)
    // For demo purposes, we'll use a mock user
    const mockUserId = 'mock-user-id';
    const childProfiles = await getAllChildProfiles(mockUserId);
    
    if (childProfiles.length === 0) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'No child profiles found'
      }, { status: 404 });
    }

    const today = new Date().toISOString().split('T')[0];
    const results = [];

    // Generate meal plans for each child
    for (const childProfile of childProfiles) {
      try {
        // Generate meal plan using OpenAI
        const mealPlan = await generateMealPlan(childProfile);
        
        // Save to database
        const dailyMeal = await createDailyMeal({
          user_id: childProfile.user_id,
          child_id: childProfile.id,
          date: today,
          meal_plan: mealPlan
        });

        if (dailyMeal) {
          results.push({
            childName: childProfile.name,
            success: true,
            mealPlan: mealPlan
          });
        } else {
          results.push({
            childName: childProfile.name,
            success: false,
            error: 'Failed to save meal plan'
          });
        }
      } catch (error) {
        console.error(`Error generating meal plan for ${childProfile.name}:`, error);
        results.push({
          childName: childProfile.name,
          success: false,
          error: 'Failed to generate meal plan'
        });
      }
    }

    const successfulGenerations = results.filter(r => r.success).length;
    const totalChildren = childProfiles.length;

    return NextResponse.json<ApiResponse<{
      message: string;
      results: any[];
      summary: {
        total: number;
        successful: number;
        failed: number;
      };
    }>>({
      success: true,
      data: {
        message: `Generated meal plans for ${successfulGenerations}/${totalChildren} children`,
        results,
        summary: {
          total: totalChildren,
          successful: successfulGenerations,
          failed: totalChildren - successfulGenerations
        }
      }
    });

  } catch (error) {
    console.error('Error in daily meal generator cron job:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Also support GET for testing
export async function GET(request: NextRequest) {
  return NextResponse.json<ApiResponse<{ message: string }>>({
    success: true,
    data: {
      message: 'Daily meal generator endpoint is active. Use POST with proper authorization to trigger generation.'
    }
  });
} 