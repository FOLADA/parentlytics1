# AI-Powered Daily Diet Recommendation System

## 🎯 Overview

This is a complete AI-powered daily diet recommendation system for Parentlytics, a parenting platform. The system automatically generates personalized daily meal plans for children based on their age, weight, activity level, and allergies.

## ✨ Features

### Core Functionality
- **Personalized Meal Plans**: AI-generated daily meal plans using GPT-4
- **Child Profile Management**: Store and manage child profiles with detailed health information
- **Automatic Daily Generation**: Cron job runs every night at 12:00 AM to generate new meal plans
- **Real-time Generation**: On-demand meal plan generation if daily plan is missing
- **Grocery List Generation**: Automatic grocery list creation from meal ingredients
- **Beautiful UI**: Responsive, animated interface with Framer Motion

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Supabase Integration**: Database for storing child profiles and meal plans
- **OpenAI GPT-4**: AI-powered meal plan generation
- **Vercel Cron Jobs**: Automated daily meal generation
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🏗️ Architecture

### Database Schema

#### Child Profiles Table
```sql
CREATE TABLE child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  activity_level TEXT CHECK (activity_level IN ('low', 'moderate', 'high')) NOT NULL,
  allergies TEXT[] DEFAULT '{}',
  health_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Daily Meals Table
```sql
CREATE TABLE daily_meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL REFERENCES child_profiles(id),
  date DATE NOT NULL,
  meal_plan JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

### File Structure
```
├── app/
│   ├── diet/
│   │   └── page.tsx                 # Main diet page
│   ├── api/
│   │   ├── diet/
│   │   │   └── today/
│   │   │       └── route.ts         # Get today's meal
│   │   ├── generateMealPlanNow/
│   │   │   └── route.ts             # On-demand meal generation
│   │   └── cron/
│   │       └── daily-meal-generator/
│   │           └── route.ts         # Daily cron job
│   └── supabaseClient.ts            # Supabase client
├── components/
│   ├── MealCard.tsx                 # Individual meal display
│   ├── LoadingIndicator.tsx         # Loading animations
│   └── ChildProfileSetup.tsx        # Child profile form
├── lib/
│   ├── types.ts                     # TypeScript interfaces
│   ├── openai.ts                    # OpenAI integration
│   └── supabase.ts                  # Database utilities
└── vercel.json                      # Cron job configuration
```

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Cron Job Security
CRON_SECRET_TOKEN=your_secure_cron_token
```

### 2. Database Setup
Run the following SQL in your Supabase SQL editor:

```sql
-- Create child_profiles table
CREATE TABLE child_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  activity_level TEXT CHECK (activity_level IN ('low', 'moderate', 'high')) NOT NULL,
  allergies TEXT[] DEFAULT '{}',
  health_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create daily_meals table
CREATE TABLE daily_meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  child_id UUID NOT NULL REFERENCES child_profiles(id),
  date DATE NOT NULL,
  meal_plan JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes for better performance
CREATE INDEX idx_child_profiles_user_id ON child_profiles(user_id);
CREATE INDEX idx_daily_meals_user_date ON daily_meals(user_id, date);
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```

## 🎨 UI Components

### MealCard Component
- Displays individual meals with beautiful gradients
- Shows calories, ingredients, and descriptions
- Animated with Framer Motion
- Color-coded by meal type (breakfast, lunch, dinner, snacks)

### LoadingIndicator Component
- Animated loading state with floating food icons
- Smooth transitions and micro-interactions
- Professional loading experience

### ChildProfileSetup Component
- Comprehensive form for child profile creation
- Form validation and error handling
- Allergy management with tags
- Responsive design for all devices

## 🔄 API Endpoints

### GET `/api/diet/today`
Fetches today's meal plan for the logged-in user.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "child_id": "uuid",
    "date": "2025-01-30",
    "meal_plan": {
      "breakfast": { ... },
      "snack1": { ... },
      "lunch": { ... },
      "snack2": { ... },
      "dinner": { ... },
      "total_calories": 1350,
      "nutrition_notes": "..."
    },
    "created_at": "2025-01-30T00:00:00Z"
  }
}
```

### POST `/api/generateMealPlanNow`
Generates a new meal plan on-demand using GPT-4.

**Request:**
```json
{
  "childProfile": {
    "name": "Nika",
    "birthdate": "2020-05-15",
    "weight": 15.5,
    "height": 95.2,
    "activity_level": "moderate",
    "allergies": ["peanuts"],
    "health_notes": "Loves fruits"
  }
}
```

### POST `/api/cron/daily-meal-generator`
Cron job endpoint for daily meal generation (requires authorization).

## 🤖 AI Integration

### GPT-4 Prompt Structure
The system uses a carefully crafted prompt that includes:
- Child's age (calculated from birthdate)
- Weight and height for portion sizing
- Activity level for calorie needs
- Allergies for ingredient avoidance
- Health notes for personalization

### Meal Plan Structure
Each meal plan includes:
- 5 meals (breakfast, 2 snacks, lunch, dinner)
- Detailed descriptions and ingredients
- Calorie counts per meal and total
- Nutrition notes for parents

## 🔒 Security Considerations

### Authentication
- Replace mock user IDs with actual authentication
- Implement proper user session management
- Add role-based access control

### API Security
- Validate all input data
- Implement rate limiting
- Use environment variables for sensitive data
- Secure cron job with authorization tokens

## 📱 Responsive Design

The system is built with mobile-first design principles:
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized for all screen sizes
- Smooth animations and transitions

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Cron Job Setup
The `vercel.json` file configures automatic daily meal generation:
- Runs every day at 12:00 AM
- Calls `/api/cron/daily-meal-generator`
- Requires proper authorization

## 🔧 Customization

### Adding New Meal Types
1. Update the `MealPlan` interface in `lib/types.ts`
2. Add meal type configuration in `MealCard.tsx`
3. Update the diet page to display new meals

### Modifying AI Prompts
Edit the prompt in `lib/openai.ts` to:
- Change nutrition guidelines
- Add new dietary restrictions
- Modify meal structure
- Update calorie calculations

### Styling Customization
- Modify Tailwind classes for color schemes
- Update Framer Motion animations
- Customize component layouts

## 🐛 Troubleshooting

### Common Issues

1. **No meal plan found**
   - Check if child profile exists
   - Verify cron job is running
   - Check OpenAI API key

2. **Database connection errors**
   - Verify Supabase credentials
   - Check database schema
   - Ensure proper permissions

3. **AI generation failures**
   - Check OpenAI API quota
   - Verify prompt structure
   - Review error logs

## 📈 Future Enhancements

### Planned Features
- Weekly meal planning
- Favorite meal saving
- Recipe sharing
- Nutritional analytics
- Meal photo uploads
- Family meal planning

### Scalability Improvements
- Caching for better performance
- Database optimization
- CDN for static assets
- Microservices architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Parentlytics platform and is proprietary software.

---

**Built with ❤️ for parents and their children's health** 