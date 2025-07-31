-- Parentlytics Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create child_profiles table
CREATE TABLE IF NOT EXISTS child_profiles (
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

-- Create daily_meals table
CREATE TABLE IF NOT EXISTS daily_meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_plan JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_child_profiles_user_id ON child_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_meals_user_id ON daily_meals(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_meals_date ON daily_meals(date);

-- Enable Row Level Security (RLS)
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_meals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for child_profiles
CREATE POLICY "Users can view their own child profiles" ON child_profiles
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own child profiles" ON child_profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own child profiles" ON child_profiles
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own child profiles" ON child_profiles
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Create RLS policies for daily_meals
CREATE POLICY "Users can view their own daily meals" ON daily_meals
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own daily meals" ON daily_meals
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own daily meals" ON daily_meals
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own daily meals" ON daily_meals
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- For development/testing, you might want to disable RLS temporarily
-- ALTER TABLE child_profiles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE daily_meals DISABLE ROW LEVEL SECURITY;

-- Insert a test child profile (optional - for testing)
-- INSERT INTO child_profiles (user_id, name, birthdate, gender, weight, height, activity_level, allergies, health_notes)
-- VALUES (
--   'mock-user-id',
--   'Test Child',
--   '2020-01-01',
--   'male',
--   15.5,
--   95.0,
--   'moderate',
--   ARRAY['nuts'],
--   'No special health notes'
-- ); 