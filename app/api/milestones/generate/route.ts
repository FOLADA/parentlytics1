import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { age } = await req.json();

    const prompt = `Generate 3-5 key developmental milestones for a ${age}-year-old child. Focus on physical, cognitive, and social-emotional development. Format the response as a JSON array where each object has 'category' and 'description' fields. Make each milestone unique and specific to the age. Ensure the descriptions are parent-friendly and encouraging.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4",
      temperature: 0.7, // Add some randomness for variety
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    const milestones = JSON.parse(response || '[]');

    return NextResponse.json({ milestones });
  } catch (error) {
    console.error('Error generating milestones:', error);
    return NextResponse.json(
      { error: 'Failed to generate milestones' },
      { status: 500 }
    );
  }
}
