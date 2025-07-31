import { NextRequest, NextResponse } from 'next/server';
import { getTodayMeal, getChildProfile } from '@/lib/supabase';
import { ApiResponse, DailyMeal } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from the request (you'll need to implement authentication)
    // For now, we'll use a mock user ID - replace with actual auth
    const userId = 'mock-user-id'; // Replace with actual user authentication
    
    // Get today's meal
    const todayMeal = await getTodayMeal(userId);
    
    if (!todayMeal) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'No meal plan found for today'
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<DailyMeal>>({
      success: true,
      data: todayMeal
    });

  } catch (error) {
    console.error('Error in /api/diet/today:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
} 