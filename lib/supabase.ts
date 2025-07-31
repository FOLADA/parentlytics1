import { supabase } from '@/app/supabaseClient';
import { ChildProfile, DailyMeal, MealPlan } from './types';

// Child Profile functions
export async function getChildProfile(userId: string): Promise<ChildProfile | null> {
  try {
    const { data, error } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching child profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getChildProfile:', error);
    return null;
  }
}

export async function createChildProfile(profile: Omit<ChildProfile, 'id' | 'created_at' | 'updated_at'>): Promise<ChildProfile | null> {
  try {
    console.log('Creating child profile with data:', profile);
    
    // Transform the data to match the database schema
    const profileData = {
      user_id: profile.user_id,
      name: profile.name,
      birthdate: profile.birthdate,
      gender: profile.gender,
      weight: profile.weight,
      height: profile.height,
      activity_level: profile.activity_level,
      allergies: profile.allergies,
      other_health_concerns: profile.other_health_concerns,
    };
    
    const { data, error } = await supabase
      .from('child_profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) {
      console.error('Error creating child profile:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

    console.log('Child profile created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in createChildProfile:', error);
    return null;
  }
}

export async function updateChildProfile(id: string, updates: Partial<ChildProfile>): Promise<ChildProfile | null> {
  try {
    const { data, error } = await supabase
      .from('child_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating child profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateChildProfile:', error);
    return null;
  }
}

// Daily Meal functions
export async function getTodayMeal(userId: string): Promise<DailyMeal | null> {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const { data, error } = await supabase
      .from('daily_meals')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching today\'s meal:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in getTodayMeal:', error);
    return null;
  }
}

export async function createDailyMeal(meal: Omit<DailyMeal, 'id' | 'created_at'>): Promise<DailyMeal | null> {
  try {
    const { data, error } = await supabase
      .from('daily_meals')
      .insert([meal])
      .select()
      .single();

    if (error) {
      console.error('Error creating daily meal:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createDailyMeal:', error);
    return null;
  }
}

export async function getAllChildProfiles(userId: string): Promise<ChildProfile[]> {
  try {
    const { data, error } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching child profiles:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllChildProfiles:', error);
    return [];
  }
}

// Database schema setup (for reference)
export const databaseSchema = {
  child_profiles: `
    CREATE TABLE child_profiles (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      name TEXT NOT NULL,
      birthdate DATE NOT NULL,
      gender TEXT CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
      weight DECIMAL(5,2) NOT NULL,
      height DECIMAL(5,2) NOT NULL,
      activity_level TEXT CHECK (activity_level IN ('low', 'moderate', 'high')) NOT NULL,
      allergies TEXT[] DEFAULT '{}',
      health_notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `,
  daily_meals: `
    CREATE TABLE daily_meals (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      child_id UUID NOT NULL REFERENCES child_profiles(id),
      date DATE NOT NULL,
      meal_plan JSONB NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(user_id, date)
    );
  `
};

// Function to check if tables exist
export async function checkDatabaseTables(): Promise<{ child_profiles: boolean; daily_meals: boolean }> {
  try {
    // Test child_profiles table
    const { error: childError } = await supabase
      .from('child_profiles')
      .select('id')
      .limit(1);
    
    // Test daily_meals table
    const { error: mealError } = await supabase
      .from('daily_meals')
      .select('id')
      .limit(1);

    return {
      child_profiles: !childError,
      daily_meals: !mealError
    };
  } catch (error) {
    console.error('Error checking database tables:', error);
    return {
      child_profiles: false,
      daily_meals: false
    };
  }
} 