'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildProfile, ChildProfileFormData, AuthContextType, User } from '@/lib/types';
import { getChildProfile, createChildProfile, updateChildProfile as updateChildProfileSupabase } from '@/lib/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication functions - replace with actual auth implementation
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - replace with actual auth
      const mockUser: User = {
        id: 'mock-user-id',
        email,
        name: email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(mockUser);
      
      // Set auth cookie for middleware
      document.cookie = 'auth-token=mock-token; path=/';
      
      // Load child profile after login to determine redirect
      await refreshChildProfile();
      
      // Return profile status for routing decision
      return { hasProfile: !!childProfile };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      // Mock signup - replace with actual auth
      const mockUser: User = {
        id: 'mock-user-id',
        email,
        name: name || email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setUser(mockUser);
      
      // Set auth cookie for middleware
      document.cookie = 'auth-token=mock-token; path=/';
      
      // New users should always go to setup
      return { hasProfile: false };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setUser(null);
      setChildProfile(null);
      // Clear any stored tokens/cookies here
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateChildProfile = async (data: ChildProfileFormData) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setIsLoading(true);
      console.log('Context updateChildProfile called with:', data);
      console.log('Current childProfile:', childProfile);
      console.log('Current user:', user);
      
      if (childProfile) {
        // Update existing profile
        console.log('Updating existing profile with ID:', childProfile.id);
        const updated = await updateChildProfileSupabase(childProfile.id, {
          ...data,
          updated_at: new Date().toISOString(),
        });
        console.log('Update result:', updated);
        if (updated) {
          setChildProfile(updated);
        }
      } else {
        // Create new profile
        console.log('Creating new profile for user:', user.id);
        const newProfile = await createChildProfile({
          user_id: user.id,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        
        if (newProfile) {
          setChildProfile(newProfile);
        } else {
          // Fallback: create a mock profile if database fails
          console.warn('Database creation failed, using mock profile');
          const mockProfile: ChildProfile = {
            id: 'mock-child-id',
            user_id: user.id,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setChildProfile(mockProfile);
        }
      }
    } catch (error) {
      console.error('Update child profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshChildProfile = async () => {
    if (!user) return;

    try {
      const profile = await getChildProfile(user.id);
      setChildProfile(profile);
    } catch (error) {
      console.error('Refresh child profile error:', error);
    }
  };

  // Load child profile when user changes
  useEffect(() => {
    if (user) {
      refreshChildProfile();
    } else {
      setChildProfile(null);
    }
  }, [user]);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for existing auth token/session
        // For now, we'll use a mock approach
        const mockUser: User = {
          id: 'mock-user-id',
          email: 'parent@example.com',
          name: 'Parent',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUser(mockUser);
        
        // Set a cookie to indicate authentication for middleware
        document.cookie = 'auth-token=mock-token; path=/';
        
        // Load child profile if user exists
        await refreshChildProfile();
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    childProfile,
    isLoading,
    login,
    signup,
    logout,
    updateChildProfile,
    refreshChildProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useChildProfile() {
  const { childProfile, isLoading } = useAuth();
  return { childProfile, isLoading };
} 