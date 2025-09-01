import { ChildProfile, ChildProfileFormData } from './types';
import { createChildProfile, updateChildProfile, getChildProfile } from './supabase';
import { localStorageUtils } from './utils';

export class ProfileManager {
  private static instance: ProfileManager;
  private profiles: Map<string, ChildProfile> = new Map();

  private constructor() {
    this.loadFromLocalStorage();
  }

  public static getInstance(): ProfileManager {
    if (!ProfileManager.instance) {
      ProfileManager.instance = new ProfileManager();
    }
    return ProfileManager.instance;
  }

  private loadFromLocalStorage() {
    try {
      const storedProfiles = localStorageUtils.getItem<ChildProfile[]>('parentlytics-child-profiles');
      if (storedProfiles && Array.isArray(storedProfiles)) {
        storedProfiles.forEach(profile => {
          this.profiles.set(profile.id, profile);
        });
      }
    } catch (error) {
      console.warn('Failed to load profiles from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      const profilesArray = Array.from(this.profiles.values());
      localStorageUtils.setItem('parentlytics-child-profiles', profilesArray);
    } catch (error) {
      console.warn('Failed to save profiles to localStorage:', error);
    }
  }

  async createProfile(userId: string, profileData: ChildProfileFormData): Promise<ChildProfile> {
    const newProfile: Omit<ChildProfile, 'id' | 'created_at' | 'updated_at'> = {
      user_id: userId,
      name: profileData.name,
      birthdate: profileData.birthdate,
      gender: profileData.gender,
      weight: profileData.weight,
      height: profileData.height,
      activity_level: profileData.activity_level,
      allergies: profileData.allergies,
      health_notes: profileData.health_notes,
    };

    // Try to save to Supabase first
    let supabaseProfile: ChildProfile | null = null;
    try {
      supabaseProfile = await createChildProfile(newProfile);
      if (supabaseProfile) {
        console.log('Profile created successfully in Supabase');
      }
    } catch (error) {
      console.warn('Failed to create profile in Supabase, using local storage:', error);
    }

    // Create local profile with generated ID if Supabase failed
    const localProfile: ChildProfile = supabaseProfile || {
      id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...newProfile,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save to local storage
    this.profiles.set(localProfile.id, localProfile);
    this.saveToLocalStorage();

    return localProfile;
  }

  async updateProfile(profileId: string, updates: Partial<ChildProfileFormData>): Promise<ChildProfile | null> {
    const existingProfile = this.profiles.get(profileId);
    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    // Try to update in Supabase first
    try {
      const supabaseProfile = await updateChildProfile(profileId, updates);
      if (supabaseProfile) {
        console.log('Profile updated successfully in Supabase');
        // Update local profile with Supabase data
        this.profiles.set(profileId, supabaseProfile);
        this.saveToLocalStorage();
        return supabaseProfile;
      }
    } catch (error) {
      console.warn('Failed to update profile in Supabase, updating local storage:', error);
    }

    // Update local profile
    const updatedProfile: ChildProfile = {
      ...existingProfile,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    this.profiles.set(profileId, updatedProfile);
    this.saveToLocalStorage();

    return updatedProfile;
  }

  async getProfile(userId: string): Promise<ChildProfile | null> {
    // Try to get from Supabase first
    try {
      const supabaseProfile = await getChildProfile(userId);
      if (supabaseProfile) {
        // Update local storage with Supabase data
        this.profiles.set(supabaseProfile.id, supabaseProfile);
        this.saveToLocalStorage();
        return supabaseProfile;
      }
    } catch (error) {
      console.warn('Failed to get profile from Supabase, checking local storage:', error);
    }

    // Fallback to local storage
    const localProfiles = Array.from(this.profiles.values());
    const userProfile = localProfiles.find(profile => profile.user_id === userId);
    
    if (userProfile) {
      console.log('Profile found in local storage');
      return userProfile;
    }

    return null;
  }

  async getAllProfiles(userId: string): Promise<ChildProfile[]> {
    // Try to get from Supabase first
    try {
      // This would need to be implemented in supabase.ts
      // For now, we'll use local storage
    } catch (error) {
      console.warn('Failed to get profiles from Supabase, using local storage:', error);
    }

    // Fallback to local storage
    const localProfiles = Array.from(this.profiles.values());
    return localProfiles.filter(profile => profile.user_id === userId);
  }

  async deleteProfile(profileId: string): Promise<boolean> {
    const existingProfile = this.profiles.get(profileId);
    if (!existingProfile) {
      return false;
    }

    // Try to delete from Supabase first
    try {
      // This would need to be implemented in supabase.ts
      // For now, we'll just remove from local storage
    } catch (error) {
      console.warn('Failed to delete profile from Supabase, removing from local storage:', error);
    }

    // Remove from local storage
    this.profiles.delete(profileId);
    this.saveToLocalStorage();

    return true;
  }

  // Export profiles for backup
  exportProfiles(): string {
    const profilesArray = Array.from(this.profiles.values());
    return JSON.stringify(profilesArray, null, 2);
  }

  // Import profiles from backup
  importProfiles(profilesJson: string): boolean {
    try {
      const profiles = JSON.parse(profilesJson);
      if (Array.isArray(profiles)) {
        profiles.forEach(profile => {
          if (profile.id && profile.user_id) {
            this.profiles.set(profile.id, profile);
          }
        });
        this.saveToLocalStorage();
        return true;
      }
    } catch (error) {
      console.error('Failed to import profiles:', error);
    }
    return false;
  }

  // Clear all profiles
  clearProfiles(): void {
    this.profiles.clear();
    this.saveToLocalStorage();
  }
} 