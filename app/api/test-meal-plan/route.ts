import { NextRequest, NextResponse } from 'next/server';
import { generateFallbackMealPlan, generateMockMealPlan } from '@/lib/mealPlanFallback';
import { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    // Generate a mock meal plan for testing
    const mockMealPlan = generateMockMealPlan();
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        mealPlan: mockMealPlan,
        message: 'Test meal plan generated successfully'
      }
    });
  } catch (error) {
    console.error('Error generating test meal plan:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to generate test meal plan'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { childProfile } = body;

    if (!childProfile) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Child profile is required'
      }, { status: 400 });
    }

    // Generate a fallback meal plan based on child profile
    const mealPlan = generateFallbackMealPlan(childProfile);
    
    return NextResponse.json<ApiResponse<any>>({
      success: true,
      data: {
        mealPlan,
        message: 'Fallback meal plan generated successfully'
      }
    });
  } catch (error) {
    console.error('Error generating fallback meal plan:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to generate fallback meal plan'
    }, { status: 500 });
  }
} 