const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDatabaseTables() {
  try {
    console.log('🔍 Checking database tables...');
    
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

    const childProfilesExists = !childError;
    const dailyMealsExists = !mealError;

    console.log('📊 Database Status:');
    console.log(`  child_profiles: ${childProfilesExists ? '✅ Exists' : '❌ Missing'}`);
    console.log(`  daily_meals: ${dailyMealsExists ? '✅ Exists' : '❌ Missing'}`);

    if (!childProfilesExists || !dailyMealsExists) {
      console.log('\n⚠️  Some tables are missing. Please run the setup script:');
      console.log('   npm run setup-db');
    } else {
      console.log('\n✅ All tables exist! Database is ready.');
    }

    return { childProfilesExists, dailyMealsExists };
  } catch (error) {
    console.error('❌ Error checking database:', error);
    return { childProfilesExists: false, dailyMealsExists: false };
  }
}

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database tables...');
    
    // Read and execute the SQL setup script
    const fs = require('fs');
    const path = require('path');
    const sqlPath = path.join(__dirname, 'setup-database.sql');
    
    if (!fs.existsSync(sqlPath)) {
      console.error('❌ SQL setup file not found:', sqlPath);
      return false;
    }
    
    const sql = fs.readFileSync(sqlPath, 'utf8');
    const statements = sql.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: statement.trim() });
        if (error) {
          console.error('❌ Error executing SQL:', error);
          console.error('Statement:', statement.trim());
          return false;
        }
      }
    }
    
    console.log('✅ Database setup completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    return false;
  }
}

async function main() {
  const command = process.argv[2];
  
  if (command === 'setup') {
    await setupDatabase();
  } else {
    await checkDatabaseTables();
  }
}

main().catch(console.error); 