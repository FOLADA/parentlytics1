import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
  }
  if (!message) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  // Prepare messages for OpenAI (system prompt + history + user message)
  const messages = [
    {
      role: 'system',
      content:
        'You are a helpful, friendly, and expert baby nurturing assistant. Give practical, evidence-based, and empathetic advice to parents about baby care, sleep, feeding, development, and parenting. Keep answers concise, clear, and supportive.',
    },
    ...(Array.isArray(history) ? history : []),
    { role: 'user', content: message },
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 512,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error?.message || 'OpenAI error' }, { status: 500 });
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ aiMessage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
} 