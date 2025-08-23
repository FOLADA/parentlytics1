import { ChildProfile, MealPlan } from './types';

// Fallback meal plans for different age groups
const fallbackMealPlans = {
  infant: {
    breakfast: {
      name: "Breast Milk or Formula",
      description: "Morning feeding - approximately 4-6 ounces",
      calories: 120,
      ingredients: ["breast milk or infant formula"]
    },
    snack1: {
      name: "Breast Milk or Formula",
      description: "Mid-morning feeding - approximately 3-4 ounces",
      calories: 90,
      ingredients: ["breast milk or infant formula"]
    },
    lunch: {
      name: "Breast Milk or Formula",
      description: "Afternoon feeding - approximately 4-6 ounces",
      calories: 120,
      ingredients: ["breast milk or infant formula"]
    },
    snack2: {
      name: "Breast Milk or Formula",
      description: "Mid-afternoon feeding - approximately 3-4 ounces",
      calories: 90,
      ingredients: ["breast milk or infant formula"]
    },
    dinner: {
      name: "Breast Milk or Formula",
      description: "Evening feeding - approximately 4-6 ounces",
      calories: 120,
      ingredients: ["breast milk or infant formula"]
    },
    total_calories: 540,
    nutrition_notes: "IMPORTANT: Babies under 6 months should ONLY consume breast milk or infant formula. Do not introduce solid foods without consulting your pediatrician."
  },
  baby: {
    breakfast: {
      name: "Iron-Fortified Baby Cereal",
      description: "1-2 tablespoons mixed with breast milk or formula",
      calories: 80,
      ingredients: ["iron-fortified baby cereal", "breast milk or formula"]
    },
    snack1: {
      name: "Breast Milk or Formula",
      description: "Mid-morning feeding - approximately 4-5 ounces",
      calories: 100,
      ingredients: ["breast milk or formula"]
    },
    lunch: {
      name: "Pureed Sweet Potato",
      description: "2-3 tablespoons of pureed sweet potato",
      calories: 60,
      ingredients: ["sweet potato", "breast milk or formula for thinning"]
    },
    snack2: {
      name: "Breast Milk or Formula",
      description: "Mid-afternoon feeding - approximately 4-5 ounces",
      calories: 100,
      ingredients: ["breast milk or formula"]
    },
    dinner: {
      name: "Pureed Apple",
      description: "2-3 tablespoons of pureed apple",
      calories: 40,
      ingredients: ["apple", "breast milk or formula for thinning"]
    },
    total_calories: 380,
    nutrition_notes: "Continue with breast milk or formula as primary nutrition. Introduce single-ingredient purees gradually. Avoid honey and cow's milk."
  },
  toddler: {
    breakfast: {
      name: "Oatmeal with Banana",
      description: "1/2 cup oatmeal with sliced banana and a splash of milk",
      calories: 200,
      ingredients: ["oats", "banana", "milk", "honey (if over 1 year)"]
    },
    snack1: {
      name: "Apple Slices with Peanut Butter",
      description: "1/2 apple sliced with 1 tablespoon natural peanut butter",
      calories: 150,
      ingredients: ["apple", "natural peanut butter"]
    },
    lunch: {
      name: "Grilled Cheese with Tomato Soup",
      description: "1/2 grilled cheese sandwich with 1/2 cup tomato soup",
      calories: 300,
      ingredients: ["bread", "cheese", "butter", "tomato soup"]
    },
    snack2: {
      name: "Yogurt with Berries",
      description: "1/2 cup yogurt with mixed berries",
      calories: 120,
      ingredients: ["yogurt", "mixed berries"]
    },
    dinner: {
      name: "Baked Chicken with Vegetables",
      description: "2 oz baked chicken with 1/2 cup steamed vegetables",
      calories: 250,
      ingredients: ["chicken breast", "carrots", "broccoli", "olive oil"]
    },
    total_calories: 1020,
    nutrition_notes: "Ensure foods are properly sized to prevent choking. Include a variety of food groups and make meals appealing."
  }
};

export function generateFallbackMealPlan(childProfile: ChildProfile): MealPlan {
  // Calculate age from birthdate
  const birthDate = new Date(childProfile.birthdate);
  const today = new Date();
  const ageInYears = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const age = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? ageInYears - 1 
    : ageInYears;

  // Select appropriate meal plan based on age
  if (age < 0.5) {
    return fallbackMealPlans.infant;
  } else if (age < 1) {
    return fallbackMealPlans.baby;
  } else {
    return fallbackMealPlans.toddler;
  }
}

// Mock meal plan generator for testing
export function generateMockMealPlan(): MealPlan {
  return {
    breakfast: {
      name: "Healthy Breakfast Bowl",
      description: "Nutritious breakfast with whole grains and fruits",
      calories: 250,
      ingredients: ["oats", "banana", "berries", "nuts", "milk"]
    },
    snack1: {
      name: "Apple with Peanut Butter",
      description: "Fresh apple slices with natural peanut butter",
      calories: 150,
      ingredients: ["apple", "peanut butter"]
    },
    lunch: {
      name: "Grilled Chicken Salad",
      description: "Fresh salad with grilled chicken and vegetables",
      calories: 350,
      ingredients: ["chicken", "lettuce", "tomatoes", "cucumber", "olive oil"]
    },
    snack2: {
      name: "Greek Yogurt with Honey",
      description: "Protein-rich yogurt with natural honey",
      calories: 120,
      ingredients: ["greek yogurt", "honey"]
    },
    dinner: {
      name: "Salmon with Rice",
      description: "Baked salmon with brown rice and steamed vegetables",
      calories: 400,
      ingredients: ["salmon", "brown rice", "broccoli", "carrots"]
    },
    total_calories: 1270,
    nutrition_notes: "Balanced meal plan with protein, complex carbohydrates, and healthy fats. Suitable for active children."
  };
} 