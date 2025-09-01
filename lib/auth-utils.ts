import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getServerSession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error in getServerSession:', error);
    return null;
  }
}

export async function getChildProfileServer() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
  
  try {
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return null;
    }
    
    // Get the child profile for the current user
    const { data: profile, error: profileError } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching child profile:', profileError);
      return null;
    }
    
    return profile;
  } catch (error) {
    console.error('Error in getChildProfileServer:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/signup');
  }
  
  return session;
}

export async function requireChildProfile() {
  const session = await requireAuth();
  const profile = await getChildProfileServer();
  
  if (!profile) {
    redirect('/setup-child');
  }
  
  return { session, profile };
}

export async function checkChildProfileExists() {
  const session = await getServerSession();
  
  if (!session) {
    return { hasProfile: false, shouldRedirect: true, redirectTo: '/signup' };
  }
  
  const profile = await getChildProfileServer();
  
  if (!profile) {
    return { hasProfile: false, shouldRedirect: true, redirectTo: '/setup-child' };
  }
  
  return { hasProfile: true, shouldRedirect: false, profile };
}