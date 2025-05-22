import { GoogleGenAI } from "@google/genai";

export class AiService {
  #ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  });

  async sendMessage(input: { message: string }) {
    const { message } = input;
    const stream = await this.#ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: message }] }],
    });
    return stream;
  }
}
