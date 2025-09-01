export interface ChildProfile {
  id: string;
  user_id: string;
  name: string;
  birthdate: string;
  gender: 'male' | 'female' | 'other';
  weight: number; // in kg
  height: number; // in cm
  activity_level: 'low' | 'moderate' | 'high';
  allergies: string[];
  other_health_concerns?: string;
  health_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MealPlan {
  breakfast: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  snack1: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  lunch: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  snack2: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  dinner: {
    name: string;
    description: string;
    calories: number;
    ingredients: string[];
  };
  total_calories: number;
  nutrition_notes?: string;
}

export interface DailyMeal {
  id: string;
  user_id: string;
  child_id: string;
  date: string; // YYYY-MM-DD format
  meal_plan: MealPlan;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateMealPlanRequest {
  childProfile: ChildProfile;
}

export interface GenerateMealPlanResponse {
  mealPlan: MealPlan;
}

// New types for the user access system
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  updated_at: string;
}

export interface ChildProfileFormData {
  name: string;
  birthdate: string;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activity_level: 'low' | 'moderate' | 'high';
  allergies: string[];
  health_notes?: string;
}

export interface AuthContextType {
  user: User | null;
  childProfile: ChildProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateChildProfile: (data: ChildProfileFormData) => Promise<void>;
  refreshChildProfile: () => Promise<void>;
  exportChildProfile: () => void;
  importChildProfile: (file: File) => Promise<boolean>;
} 