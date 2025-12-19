
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDailyReflection(completedCount: number, totalCount: number, lastBook?: string) {
  try {
    const progressPercent = ((completedCount / totalCount) * 100).toFixed(1);
    
    const prompt = `The user is tracking their Bible reading progress. 
    Current status: ${completedCount} out of ${totalCount} books completed (${progressPercent}%). 
    ${lastBook ? `The last book they finished was ${lastBook}.` : ""}
    
    Provide a brief, encouraging word of wisdom or a short reflection (max 100 words). 
    If they are just starting, encourage them. If they are halfway, celebrate the milestone.
    Use a warm, spiritual, yet modern tone. Include a relevant Bible verse reference that matches their progress or the last book.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep going! 'Thy word is a lamp unto my feet, and a light unto my path.' (Psalm 119:105)";
  }
}
