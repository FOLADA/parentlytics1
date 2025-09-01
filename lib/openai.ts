import OpenAI from 'openai';
import { ChildProfile, MealPlan } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMealPlan(childProfile: ChildProfile): Promise<MealPlan> {
  // Calculate age from birthdate
  const birthDate = new Date(childProfile.birthdate);
  const today = new Date();
  const ageInYears = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const age = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? ageInYears - 1 
    : ageInYears;

  const prompt = `You are a certified pediatric nutritionist with expertise in child development and nutrition. Generate a personalized daily meal plan for a child with the following characteristics:

Child Profile:
- Age: ${age} years old (${age < 1 ? Math.floor(age * 12) + ' months' : age + ' years'})
- Weight: ${childProfile.weight}kg
- Height: ${childProfile.height}cm
- Gender: ${childProfile.gender}
- Activity Level: ${childProfile.activity_level}
- Allergies: ${childProfile.allergies.length > 0 ? childProfile.allergies.join(', ') : 'None'}
- Health Notes: ${childProfile.other_health_concerns || 'None'}

CRITICAL AGE-APPROPRIATE REQUIREMENTS:
${age < 0.5 ? `
- This child is under 6 months old
- ONLY provide breast milk or infant formula
- NO solid foods, purees, or any other foods
- Include 5-6 feedings per day
- Each feeding should be 3-6 ounces depending on age
- Total daily calories should be 400-600 calories
- Include important safety notes about exclusive breastfeeding/formula feeding
` : age < 1 ? `
- This child is 6-12 months old
- Primary nutrition should still be breast milk or formula
- May include small amounts of iron-fortified baby cereal and pureed foods
- Introduce only single-ingredient purees
- Avoid honey, cow's milk, and choking hazards
- Include important notes about gradual introduction of solids
` : `
- This child is over 1 year old
- Can include a variety of age-appropriate solid foods
- Ensure foods are properly sized to prevent choking
- Include a variety of food groups
- Make meals appealing and kid-friendly
- Consider the activity level for calorie needs
- Include two healthy snacks between main meals
`}

Additional Requirements:
1. Create age-appropriate, nutritious meals
2. Avoid any ingredients that match the allergies
3. Ensure proper portion sizes for the child's age and weight
4. Include important safety notes and feeding guidelines

Please return a JSON object with the following structure (no additional text, just the JSON):
{
  "breakfast": {
    "name": "Meal name",
    "description": "Detailed description of the meal",
    "calories": 300,
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"]
  },
  "snack1": {
    "name": "Snack name",
    "description": "Detailed description of the snack",
    "calories": 150,
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "lunch": {
    "name": "Meal name",
    "description": "Detailed description of the meal",
    "calories": 400,
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"]
  },
  "snack2": {
    "name": "Snack name",
    "description": "Detailed description of the snack",
    "calories": 150,
    "ingredients": ["ingredient 1", "ingredient 2"]
  },
  "dinner": {
    "name": "Meal name",
    "description": "Detailed description of the meal",
    "calories": 350,
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"]
  },
  "total_calories": 1350,
  "nutrition_notes": "Brief nutrition notes and tips for parents"
}

Ensure the total calories are appropriate for the child's age, weight, and activity level.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a certified pediatric nutritionist. Always respond with valid JSON only, no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const mealPlan = JSON.parse(response) as MealPlan;
    
    // Validate the response structure
    if (!mealPlan.breakfast || !mealPlan.lunch || !mealPlan.dinner || !mealPlan.snack1 || !mealPlan.snack2) {
      throw new Error('Invalid meal plan structure received from OpenAI');
    }

    return mealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw new Error('Failed to generate meal plan');
  }
} 