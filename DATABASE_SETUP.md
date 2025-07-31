# Database Setup for Parentlytics

This document describes the database setup for the child profile system in Parentlytics.

## Database Schema

### Child Profiles Table

The `child_profiles` table stores information about each user's child:

```sql
CREATE TABLE child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  weight NUMERIC(5,2),
  height NUMERIC(5,2),
  activity_level TEXT CHECK (activity_level IN ('low', 'moderate', 'high')),
  allergies TEXT[] DEFAULT '{}',
  other_health_concerns TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Key Features

- **One profile per user**: Unique index on `user_id` ensures each user can only have one child profile
- **Row Level Security (RLS)**: Users can only access their own child profile
- **Automatic timestamps**: `created_at` and `updated_at` are automatically managed
- **Data validation**: Check constraints ensure valid gender and activity level values

## Setup Instructions

### 1. Environment Variables

Ensure you have the following environment variables set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Setup

Run the database setup script:

```bash
npm run setup-db
```

### 3. Verify Setup

Check that all tables exist:

```bash
npm run check-db
```

## Authentication Flow

### 1. User Registration/Login
- Users sign up or log in through the authentication system
- Session is established with Supabase Auth

### 2. Profile Check
- Middleware checks if user has a child profile
- If no profile exists, redirects to `/setup-child`
- If profile exists, allows access to protected routes

### 3. Profile Setup
- New users are redirected to `/setup-child`
- Form collects child information
- Data is stored in `child_profiles` table
- User is redirected to `/profile` after setup

### 4. Profile Management
- Users can view their child profile at `/profile`
- Profile can be edited inline
- Changes are saved to the database

## API Endpoints

### Child Profile Management

- `GET /api/child-profile` - Get current user's child profile
- `POST /api/child-profile` - Create new child profile
- `PUT /api/child-profile` - Update existing child profile

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

## Security Features

### Row Level Security (RLS)

The following policies are applied to the `child_profiles` table:

```sql
-- Users can view their own child profile
CREATE POLICY "Users can view own child profile" ON child_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own child profile
CREATE POLICY "Users can insert own child profile" ON child_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own child profile
CREATE POLICY "Users can update own child profile" ON child_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own child profile
CREATE POLICY "Users can delete own child profile" ON child_profiles
  FOR DELETE USING (auth.uid() = user_id);
```

### Data Validation

- **Gender**: Must be 'male', 'female', or 'other'
- **Activity Level**: Must be 'low', 'moderate', or 'high'
- **Weight/Height**: Numeric values with appropriate precision
- **Birthdate**: Must be a valid date and not in the future

## Error Handling

The system includes comprehensive error handling:

- **Database errors**: Logged and user-friendly messages displayed
- **Validation errors**: Form validation with specific error messages
- **Authentication errors**: Proper redirects and error states
- **Network errors**: Retry mechanisms and fallback states

## Testing

To test the system:

1. **Fresh user flow**:
   - Sign up → Redirected to `/setup-child` → Create profile → Redirected to `/profile`

2. **Existing user flow**:
   - Login → Check for profile → If exists, go to `/profile`; if not, go to `/setup-child`

3. **Profile editing**:
   - Visit `/profile` → Click edit → Modify fields → Save changes

## Troubleshooting

### Common Issues

1. **"Table does not exist" error**:
   - Run `npm run setup-db` to create tables

2. **Authentication errors**:
   - Check environment variables
   - Verify Supabase project settings

3. **RLS policy errors**:
   - Ensure user is authenticated
   - Check that policies are properly applied

### Debug Commands

```bash
# Check database status
npm run check-db

# View logs
npm run dev

# Test API endpoints
curl -X GET http://localhost:3000/api/child-profile
```

## Future Enhancements

- Multiple children per user
- Profile sharing between parents
- Advanced health tracking
- Integration with external health APIs
- Export/import functionality 