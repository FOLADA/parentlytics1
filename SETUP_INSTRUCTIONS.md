# Setup Instructions for Parentlytics

## 1. Environment Variables Setup

### Create `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local
```

### Fill in the required values:

#### For Azure AI:
```bash
AZURE_AI_TOKEN=your_azure_ai_token_here
AZURE_AI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_AI_MODEL=gpt-4
```

#### For OpenAI (Alternative):
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

#### For Supabase:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 2. Azure AI Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new Azure OpenAI resource
3. Deploy a GPT-4 model
4. Get your API key and endpoint URL
5. Update `.env.local` with your values

## 3. OpenAI Setup (Alternative)

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an API key
3. Add it to `.env.local`

## 4. Supabase Setup

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key
4. Update `.env.local` with your values

## 5. Database Setup

Run the database setup script:
```bash
npm run setup-db
```

## 6. Test the Setup

1. Start the development server:
```bash
npm run dev
```

2. Test AI chat functionality
3. Test authentication flow

## 7. Troubleshooting

- If AI chat doesn't work, check your API keys
- If authentication fails, check Supabase configuration
- Check browser console for error messages 