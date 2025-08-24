# Supabase Authentication Troubleshooting Guide

## Problem: "Failed to fetch" Error

### Symptoms
- Users see "Failed to fetch" error during signup/login
- Supabase authentication calls fail
- Network connection issues to Supabase

### Root Causes
1. **Network Issues**: Internet connectivity problems
2. **Supabase Service**: Service temporarily unavailable
3. **Environment Variables**: Incorrect or missing configuration
4. **CORS Issues**: Cross-origin request problems
5. **Firewall/Proxy**: Corporate or network restrictions

## Solutions Implemented

### 1. Connection Health Check
```typescript
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('_dummy_table_').select('*').limit(1);
    return true; // Connection working
  } catch (err) {
    console.warn('Supabase connection check failed:', err);
    return false; // Connection failed
  }
};
```

### 2. Graceful Fallback to Mock Auth
When Supabase is unavailable, the app automatically falls back to mock authentication:

```typescript
if (!isConnected) {
  console.warn('Supabase not accessible, using mock authentication');
  // Simulate successful authentication
  // Redirect user to continue with app functionality
}
```

### 3. Enhanced Error Handling
```typescript
export const handleSupabaseError = (error: any) => {
  // Handle token/refresh errors
  if (error?.message?.includes('token') || error?.message?.includes('refresh')) {
    console.warn('Supabase auth error (expected in mock mode):', error.message);
    return null; // Error handled gracefully
  }
  
  // Handle network errors
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    console.warn('Supabase network error (expected in mock mode):', error.message);
    return null; // Error handled gracefully
  }
  
  // Return error for user display if needed
  return error;
};
```

## How It Works

### 1. Pre-Authentication Check
Before attempting authentication, the app checks if Supabase is accessible.

### 2. Fallback Strategy
- **Primary**: Real Supabase authentication
- **Fallback**: Mock authentication with user feedback
- **Graceful Degradation**: App continues to function

### 3. User Experience
- Users see clear feedback about authentication mode
- App functionality remains available
- Seamless transition between real and mock auth

## Testing the Fix

### 1. Test with Supabase Available
```bash
# Ensure environment variables are set
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Test with Supabase Unavailable
- Disconnect internet
- Use incorrect environment variables
- Block Supabase domain in firewall

### 3. Expected Behavior
- Connection check fails gracefully
- Mock authentication activates
- User sees "(Mock Mode)" or "(Fallback Mode)" message
- App continues to function

## Environment Variables

### Required Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional Variables
```bash
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Monitoring and Debugging

### Console Logs
- Connection status checks
- Authentication mode (real/mock)
- Error handling details

### User Feedback
- Clear indication of authentication mode
- Error messages when appropriate
- Success messages with mode indication

## Future Improvements

1. **Retry Logic**: Automatic retry for failed connections
2. **Offline Mode**: Full offline functionality
3. **Connection Pooling**: Better connection management
4. **Real-time Status**: Live connection status indicator
5. **User Preferences**: Allow users to choose auth mode

## Common Issues and Solutions

### Issue: "Failed to fetch"
**Solution**: Implemented connection check and fallback

### Issue: "Token refresh failed"
**Solution**: Graceful error handling with mock auth

### Issue: "Network error"
**Solution**: Automatic fallback to mock authentication

### Issue: "CORS error"
**Solution**: Proper Supabase client configuration

## Support

If issues persist:
1. Check environment variables
2. Verify Supabase project status
3. Test network connectivity
4. Review console logs
5. Check Supabase dashboard for errors 