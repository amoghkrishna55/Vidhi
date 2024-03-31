import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiApiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(geminiApiKey);

function fileToGenerativePart(base64: string, mimeType: string) {
  const match = base64.match(/base64,(.*)/);
  const base64Data = match?.[1] ?? "";
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const { file } = reqBody;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt =
      "You are a professional law consultant. Tell me about this document, if the document is not related to law, just say please upload a legal document";
    const imageParts = [fileToGenerativePart(file.data, file.mimeType)];
    console.log("Image parts:", imageParts); // Log the image parts
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log("hereResponse:"); // Log the response
    return NextResponse.json({ text });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
