import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Using mock mode.');
}

// Create Supabase client with better error handling and auth settings
export const supabase = createClient(
  supabaseUrl || 'https://mock.supabase.co',
  supabaseAnonKey || 'mock-key',
  {
    auth: {
      autoRefreshToken: false, // Disable automatic token refresh to prevent errors
      persistSession: false,   // Don't persist sessions in mock mode
      detectSessionInUrl: false, // Don't detect sessions in URL
    },
    global: {
      headers: {
        'X-Client-Info': 'parentlytics-web'
      }
    }
  }
);

// Add error handling for auth errors
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in successfully');
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  }
});

// Handle auth errors gracefully by catching them in operations
export const handleSupabaseError = (error: any) => {
  // Check if it's a token/refresh related error
  if (error?.message?.includes('token') || error?.message?.includes('refresh')) {
    console.warn('Supabase auth error (expected in mock mode):', error.message);
    return null;
  }
  
  // Check if it's a network or connection error
  if (error?.message?.includes('fetch') || error?.message?.includes('network') || error?.message?.includes('connection')) {
    console.warn('Supabase network error (expected in mock mode):', error.message);
    return null;
  }
  
  // Check if it's an empty error object (common with auth issues)
  if (error && typeof error === 'object' && Object.keys(error).length === 0) {
    console.warn('Supabase empty error object (likely auth related, expected in mock mode)');
    return null;
  }
  
  // Check if it's a generic auth error
  if (error?.status === 401 || error?.status === 403) {
    console.warn('Supabase auth status error (expected in mock mode):', error.status);
    return null;
  }
  
  // Log other errors normally
  if (error && (error.message || error.details || error.hint || error.code)) {
    console.error('Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      status: error.status
    });
  } else {
    console.error('Supabase error (no details):', error);
  }
  
  return error;
}; 