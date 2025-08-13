'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChildProfile, ChildProfileFormData, AuthContextType, User } from '@/lib/types';
import { getChildProfile, createChildProfile, updateChildProfile as updateChildProfileSupabase } from '@/lib/supabase';
import { localStorageUtils } from '@/lib/utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [childProfile, setChildProfile] = useState<ChildProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadDataFromStorage = async () => {
      try {
        // Check if localStorage is available
        if (!localStorageUtils.isAvailable()) {
          console.warn('localStorage is not available, using mock mode only');
          return;
        }

        // Load user from localStorage
        const parsedUser = localStorageUtils.getItem<User>('parentlytics-user');
        if (parsedUser) {
          setUser(parsedUser);
          console.log('Loaded user from localStorage:', parsedUser);
        }

        // Load child profile from localStorage
        const parsedChildProfile = localStorageUtils.getItem<ChildProfile>('parentlytics-child-profile');
        if (parsedChildProfile) {
          setChildProfile(parsedChildProfile);
          console.log('Loaded child profile from localStorage:', parsedChildProfile);
          
          // Try to sync with database if we have a user
          if (parsedUser) {
            try {
              console.log('Attempting to sync child profile with database...');
              const dbProfile = await getChildProfile(parsedUser.id);
              if (dbProfile) {
                console.log('Found profile in database, updating local state');
                setChildProfile(dbProfile);
              } else {
                console.log('No profile found in database, keeping local version');
              }
            } catch (error) {
              console.warn('Failed to sync with database, keeping local version:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadDataFromStorage();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const success = localStorageUtils.setItem('parentlytics-user', user);
      if (success) {
        console.log('Saved user to localStorage:', user);
      }
    } else {
      const success = localStorageUtils.removeItem('parentlytics-user');
      if (success) {
        console.log('Removed user from localStorage');
      }
    }
  }, [user]);

  // Save child profile to localStorage whenever it changes
  useEffect(() => {
    if (childProfile) {
      const success = localStorageUtils.setItem('parentlytics-child-profile', childProfile);
      if (success) {
        console.log('Saved child profile to localStorage:', childProfile);
      } else {
        // If localStorage fails, try to clear it and retry
        console.warn('Failed to save child profile, clearing localStorage and retrying...');
        if (localStorageUtils.clear()) {
          const retrySuccess = localStorageUtils.setItem('parentlytics-child-profile', childProfile);
          if (retrySuccess) {
            console.log('Successfully saved child profile after clearing localStorage');
          }
        }
      }
    } else {
      const success = localStorageUtils.removeItem('parentlytics-child-profile');
      if (success) {
        console.log('Removed child profile from localStorage');
      }
    }
  }, [childProfile]);

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
      // Clear localStorage
      localStorageUtils.removeItem('parentlytics-user');
      localStorageUtils.removeItem('parentlytics-child-profile');
      console.log('Cleared localStorage on logout');
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
        } else {
          // Fallback: update mock profile if database fails
          console.warn('Database update failed, updating mock profile');
          const updatedMockProfile: ChildProfile = {
            ...childProfile,
            ...data,
            updated_at: new Date().toISOString(),
          };
          setChildProfile(updatedMockProfile);
        }
      } else {
        // Create new profile
        console.log('Creating new profile for user:', user.id);
        const newProfile = await createChildProfile({
          user_id: user.id,
          ...data,
        });
        
        if (newProfile) {
          setChildProfile(newProfile);
        } else {
          // Fallback: create a mock profile if database fails
          console.warn('Database creation failed, using mock profile');
          const mockProfile: ChildProfile = {
            id: 'mock-child-id-' + Date.now(), // Generate unique ID
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
      // Even if database fails, create/update mock profile for offline functionality
      if (childProfile) {
        const updatedMockProfile: ChildProfile = {
          ...childProfile,
          ...data,
          updated_at: new Date().toISOString(),
        };
        setChildProfile(updatedMockProfile);
      } else {
        const mockProfile: ChildProfile = {
          id: 'mock-child-id-' + Date.now(),
          user_id: user.id,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setChildProfile(mockProfile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshChildProfile = async () => {
    if (!user) {
      console.log('No user, skipping child profile refresh');
      return;
    }

    try {
      console.log('Refreshing child profile for user:', user.id);
      const profile = await getChildProfile(user.id);
      console.log('Child profile refresh result:', profile);
      setChildProfile(profile);
    } catch (error) {
      // Handle Supabase auth errors gracefully in mock mode
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as any).message;
        if (errorMessage?.includes('token') || errorMessage?.includes('refresh')) {
          console.warn('Supabase auth error (expected in mock mode):', errorMessage);
          return;
        }
      }
      console.error('Refresh child profile error:', error);
    }
  };

  // Load child profile when user changes
  useEffect(() => {
    console.log('User changed, current user:', user);
    if (user) {
      console.log('User exists, refreshing child profile');
      refreshChildProfile();
    } else {
      console.log('No user, clearing child profile');
      setChildProfile(null);
    }
  }, [user]);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        // Check for existing auth token/session
        // For now, we'll use a mock approach
        const mockUser: User = {
          id: 'mock-user-id',
          email: 'parent@example.com',
          name: 'Parent',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        console.log('Setting mock user:', mockUser);
        setUser(mockUser);
        
        // Set a cookie to indicate authentication for middleware
        document.cookie = 'auth-token=mock-token; path=/';
        console.log('Set auth cookie');
        
        // Load child profile if user exists
        console.log('About to refresh child profile...');
        await refreshChildProfile();
        console.log('Child profile refresh completed');
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
        console.log('Auth initialization completed');
      }
    };

    console.log('Starting auth initialization...');
    initializeAuth();
  }, []);

  // Function to export child profile data
  const exportChildProfile = () => {
    if (!childProfile) return null;
    
    try {
      const dataStr = JSON.stringify(childProfile, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `child-profile-${childProfile.name}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      console.log('Exported child profile data');
    } catch (error) {
      console.error('Error exporting child profile:', error);
    }
  };

  // Function to import child profile data
  const importChildProfile = async (file: File) => {
    try {
      const text = await file.text();
      const importedProfile = JSON.parse(text) as ChildProfile;
      
      // Validate imported data
      if (importedProfile.name && importedProfile.birthdate && importedProfile.gender) {
        setChildProfile(importedProfile);
        console.log('Imported child profile:', importedProfile);
        return true;
      } else {
        throw new Error('Invalid profile data format');
      }
    } catch (error) {
      console.error('Error importing child profile:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    childProfile,
    isLoading,
    login,
    signup,
    logout,
    updateChildProfile,
    refreshChildProfile,
    exportChildProfile,
    importChildProfile,
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