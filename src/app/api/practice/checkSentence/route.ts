import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
    try {
        const { randomWord, inputSentence } = await request.json();

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: `
            Given this word and input sentence,
            check the grammar to see if the word makes sense in the context.
            respond with 'Grammatically correct!' if it's grammatically correct, and 'Not correct' if it's not.
            Give a one to two sentence explanation as to why the user answer is correct or incorrect,
            and provide a fixed version of the sentence if incorrect,
            keeping it as close to the original sentence as possible.
            Use English for the explanation, but you can give examples in Chinese if needed.
            Any Chinese examples in your answer should be in Traditional Chinese unless the user input is in Simplified Chinese.
            your word: ${randomWord} and your sentence: ${inputSentence}`,
            config: {
                systemInstruction:
                    "You are a Chinese language instructor who checks grammar",
            },
        });

        const responseText = response.text;

        return NextResponse.json({ response: responseText });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
