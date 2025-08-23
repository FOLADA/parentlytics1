import { NextRequest, NextResponse } from 'next/server';

// AI Configuration - Support both Azure and OpenAI
const azureToken = process.env.AZURE_AI_TOKEN;
const azureEndpoint = process.env.AZURE_AI_ENDPOINT;
const azureModel = process.env.AZURE_AI_MODEL;
const openaiKey = process.env.OPENAI_API_KEY;

// Check which service is available
const useAzure = azureToken && azureEndpoint && azureModel;
const useOpenAI = openaiKey;

if (!useAzure && !useOpenAI) {
  console.warn('No AI service configured. Please set up Azure AI or OpenAI environment variables.');
}

// System prompt for parenting context
const systemPrompt = `You are a Georgian parenting expert and child development specialist. You communicate exclusively in Georgian language and provide supportive, practical parenting advice.

IMPORTANT: Respond in plain text only. Do not use any formatting, asterisks, bold text, or special characters. Write in simple, readable Georgian text.

Your role:
- Provide evidence-based parenting advice
- Be warm, supportive, and understanding
- Give practical, actionable suggestions
- Explain complex topics in simple terms
- Help parents feel confident and supported

Topics you can help with:
- Child development and milestones
- Behavioral issues and discipline
- Sleep, nutrition, and health
- Emotional development and mental health
- Education and learning
- Family relationships and dynamics
- Screen time and technology use
- Parenting strategies and approaches

Always respond in Georgian language only. Keep responses clear, helpful, and free of any formatting symbols.`;




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    // Prepare messages for Azure AI
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    let response;
    
    if (useAzure) {
      // Make request to Azure AI
      response = await fetch(`${azureEndpoint}/openai/deployments/${azureModel}/chat/completions?api-version=2024-02-15-preview`, {
        method: 'POST',
        headers: {
          'api-key': azureToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
        }),
      });
    } else if (useOpenAI) {
      // Make request to OpenAI
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9,
        }),
      });
    } else {
      throw new Error('No AI service configured');
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      throw new Error('No response from AI');
    }

    return NextResponse.json({ 
      aiMessage: aiMessage,
      success: true 
    });

  } catch (error) {
    console.error('Azure AI Chat API Error:', error);
    
    // Fallback responses in Georgian
    const fallbackResponses = [
      "უკაცრავად, ვერ მივიღე პასუხი AI სერვისიდან. გთხოვთ შეამოწმოთ კონფიგურაცია.",
      "ტექნიკური პრობლემის გამო ვერ შემიძლია პასუხის გაცემა. გთხოვთ შეამოწმოთ .env.local ფაილი.",
      "დროებით ვერ ვუკავშირდები AI სერვისს. გთხოვთ დაამატოთ API გასაღები."
    ];
    
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    return NextResponse.json(
      { 
        error: 'Failed to get AI response',
        aiMessage: fallbackResponse 
      },
      { status: 500 }
    );
  }
}

