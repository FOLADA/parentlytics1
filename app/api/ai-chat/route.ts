import { NextRequest, NextResponse } from 'next/server';

// Azure AI Configuration
const token = "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";
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";

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

    // Make request to Azure AI
    const response = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`Azure AI API error: ${response.status}`);
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
      "უკაცრავად, ვერ მივიღე პასუხი AI სერვისიდან. სცადეთ თავიდან ან დაუკავშირდით მხარდაჭერას.",
      "ტექნიკური პრობლემის გამო ვერ შემიძლია პასუხის გაცემა. გთხოვთ სცადოთ მოგვიანებით.",
      "დროებით ვერ ვუკავშირდები AI სერვისს. გთხოვთ სცადოთ რამდენიმე წუთის შემდეგ."
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

