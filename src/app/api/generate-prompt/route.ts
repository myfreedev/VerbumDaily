import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { verse } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      Create a detailed, aesthetically pleasing image generation prompt based on the following Bible verse:
      "${verse}"
      
      The style should be "classical oil painting" or "divine ethereal digital art".
      Focus on visual elements, lighting (e.g., soft divine light, golden rays), and symbolism.
      Keep the prompt concise but descriptive (approx 30-50 words).
      Output ONLY the prompt text, no other commentary.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ prompt: text.trim() });
    } catch (error) {
        console.error("Error generating prompt:", error);
        return NextResponse.json(
            { error: "Failed to generate prompt" },
            { status: 500 }
        );
    }
}
