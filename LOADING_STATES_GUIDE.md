# Loading States Guide for Parentlytics

## Overview
This guide outlines the comprehensive loading states system implemented across the Parentlytics application to provide users with clear feedback during operations.

## Components Created

### 1. LoadingStates Component
Main loading component with different types and sizes.

**Props:**
- `type`: Loading type ('meal-plan', 'profile', 'auth', 'ai-chat', 'general')
- `message`: Custom message override
- `size`: Component size ('small', 'medium', 'large')
- `showProgress`: Show progress bar
- `progress`: Progress percentage (0-100)

**Usage:**
```tsx
<LoadingStates type="meal-plan" size="large" />
<LoadingStates type="profile" message="Custom message..." />
<LoadingStates type="ai-chat" showProgress progress={75} />
```

### 2. SkeletonLoader Component
Skeleton loading for content placeholders.

**Props:**
- `type`: Skeleton type ('card', 'text', 'button')
- `count`: Number of skeleton items

**Usage:**
```tsx
<SkeletonLoader type="card" count={3} />
<SkeletonLoader type="text" count={5} />
```

### 3. InlineLoader Component
Small inline loading indicator for buttons and small areas.

**Props:**
- `size`: Size ('small', 'medium')
- `message`: Loading message

**Usage:**
```tsx
<InlineLoader size="small" message="Loading..." />
<InlineLoader size="medium" />
```

## Loading Types

### Meal Plan Loading
- **Icon**: ChefHat
- **Color**: Blue
- **Message**: "თქვენი პერსონალიზებული კვების გეგმის შექმნა..."
- **Use Case**: Generating meal plans, fetching nutrition data

### Profile Loading
- **Icon**: User
- **Color**: Purple
- **Message**: "პროფილის განახლება..."
- **Use Case**: Updating child profiles, loading user data

### Authentication Loading
- **Icon**: Heart
- **Color**: Red
- **Message**: "ავტორიზაცია..."
- **Use Case**: Login, signup, session management

### AI Chat Loading
- **Icon**: Brain
- **Color**: Indigo
- **Message**: "AI ფიქრობს..."
- **Use Case**: AI responses, chat processing

### General Loading
- **Icon**: Loader2
- **Color**: Gray
- **Message**: "იტვირთება..."
- **Use Case**: Default loading states

## Implementation Examples

### Page Loading
```tsx
if (isLoading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <LoadingStates type="meal-plan" size="large" />
    </div>
  );
}
```

### Button Loading
```tsx
<button disabled={isSubmitting}>
  {isSubmitting ? (
    <InlineLoader size="small" message="Saving..." />
  ) : (
    <>
      <Save className="w-4 h-4" />
      Save
    </>
  )}
</button>
```

### Inline Loading
```tsx
{isTyping && (
  <InlineLoader size="small" message="Typing..." />
)}
```

### Skeleton Loading
```tsx
{loading ? (
  <SkeletonLoader type="card" count={3} />
) : (
  <ActualContent />
)}
```

## Best Practices

1. **Always Show Loading States**: Every async operation should have a loading indicator
2. **Use Appropriate Types**: Match loading type to the operation being performed
3. **Consistent Sizing**: Use appropriate sizes for different contexts
4. **Progress Indicators**: Show progress for long-running operations
5. **Accessibility**: Ensure loading states are screen reader friendly
6. **Performance**: Use skeleton loaders for content-heavy pages

## Accessibility Features

- **Screen Reader Support**: Loading messages are properly announced
- **Keyboard Navigation**: Loading states don't interfere with keyboard navigation
- **Color Contrast**: Loading indicators meet accessibility standards
- **Animation Control**: Respects user's motion preferences

## Future Enhancements

1. **Custom Animations**: Allow custom animation patterns
2. **Progress Tracking**: Real-time progress updates for long operations
3. **Error States**: Integrated error handling with loading states
4. **Performance Metrics**: Track loading times for optimization
5. **User Preferences**: Remember user's loading state preferences 