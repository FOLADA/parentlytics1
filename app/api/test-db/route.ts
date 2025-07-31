import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseTables } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const tableStatus = await checkDatabaseTables();
    
    return NextResponse.json({
      success: true,
      tables: tableStatus,
      message: tableStatus.child_profiles 
        ? 'Database tables exist' 
        : 'Database tables missing - need to run schema setup'
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      tables: { child_profiles: false, daily_meals: false }
    });
  }
} 