-- Parentlytics Database Setup Script (Development Version)
-- Run this in your Supabase SQL Editor
-- This version disables RLS for easier development with mock authentication

-- Create child_profiles table
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Using TEXT instead of UUID for mock user IDs
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
  user_id TEXT NOT NULL, -- Using TEXT instead of UUID for mock user IDs
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

-- Disable Row Level Security for development
ALTER TABLE child_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_meals DISABLE ROW LEVEL SECURITY;

-- Insert a test child profile for development
INSERT INTO child_profiles (user_id, name, birthdate, gender, weight, height, activity_level, allergies, health_notes)
VALUES (
  'mock-user-id',
  'Test Child',
  '2020-01-01',
  'male',
  15.5,
  95.0,
  'moderate',
  ARRAY['nuts'],
  'No special health notes'
) ON CONFLICT DO NOTHING;

-- Show the created tables
SELECT 'child_profiles' as table_name, COUNT(*) as row_count FROM child_profiles
UNION ALL
SELECT 'daily_meals' as table_name, COUNT(*) as row_count FROM daily_meals; 