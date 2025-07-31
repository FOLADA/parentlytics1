import { supabase } from '@/app/supabaseClient';

export interface ProfileStatus {
  isAuthenticated: boolean;
  hasProfile: boolean;
  user?: any;
  profile?: any;
}

export async function checkProfileStatus(): Promise<ProfileStatus> {
  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return {
        isAuthenticated: false,
        hasProfile: false,
      };
    }

    // Check if user has a child profile
    const { data: profile, error: profileError } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    return {
      isAuthenticated: true,
      hasProfile: !!profile && !profileError,
      user,
      profile,
    };
  } catch (error) {
    console.error('Error checking profile status:', error);
    return {
      isAuthenticated: false,
      hasProfile: false,
    };
  }
}

export function getRedirectPath(profileStatus: ProfileStatus): string {
  if (!profileStatus.isAuthenticated) {
    return '/signup';
  }
  
  if (!profileStatus.hasProfile) {
    return '/setup-child';
  }
  
  return '/dashboard';
} 