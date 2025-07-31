const { createClient } = require('@supabase/supabase-js');

// You'll need to add your Supabase URL and anon key here
const supabaseUrl = 'https://gdhphdycxxwffasekjjr.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking database connection...');
  
  try {
    // Test basic connection
    console.log('Testing connection...');
    
    // Test child_profiles table
    console.log('Testing child_profiles table...');
    const { data: childData, error: childError } = await supabase
      .from('child_profiles')
      .select('id')
      .limit(1);
    
    if (childError) {
      console.log('❌ child_profiles table error:', childError.message);
      console.log('Error code:', childError.code);
      console.log('Error details:', childError.details);
    } else {
      console.log('✅ child_profiles table exists');
    }
    
    // Test daily_meals table
    console.log('Testing daily_meals table...');
    const { data: mealData, error: mealError } = await supabase
      .from('daily_meals')
      .select('id')
      .limit(1);
    
    if (mealError) {
      console.log('❌ daily_meals table error:', mealError.message);
      console.log('Error code:', mealError.code);
      console.log('Error details:', mealError.details);
    } else {
      console.log('✅ daily_meals table exists');
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

checkDatabase(); 