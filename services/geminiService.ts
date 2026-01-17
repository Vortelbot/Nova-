
import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY || "";
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateCode = async (prompt: string, language: string, currentCode: string) => {
  const ai = getAI();
  if (!ai) return null;

  try {
    const systemInstruction = `You are an expert developer specializing in ${language}. 
    Your task is to generate clean, production-ready code for a Discord bot or application.
    Current Main File Code:
    ${currentCode}
    
    The user wants to: ${prompt}
    
    Return ONLY the full updated code for the file. No explanations, no markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction
      }
    });

    return response.text.replace(/```[a-z]*\n/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
};

export const analyzeLogs = async (logs: string[]) => {
  const ai = getAI();
  if (!ai) return "AI Analysis unavailable: No API Key configured.";

  try {
    const prompt = `Analyze these Discord bot logs. Explain errors and suggest fixes.
    Logs: ${logs.join('\n')}`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "AI Fix offline. Manual check required.";
  }
};

export const simulateExecution = async (files: { name: string, content: string }[], language: string) => {
  const ai = getAI();
  const codeSummary = files.map(f => `--- FILE: ${f.name} ---\n${f.content}`).join('\n\n');
  const fallback = [
    `INFO: Starting execution of ${language} environment...`,
    "SYSTEM: Loading main file entry point.",
    "DEBUG: Environment variables injected.",
    "READY: Process started successfully."
  ];
  
  if (!ai) return fallback;

  try {
    const prompt = `You are a terminal emulator for a ${language} Discord bot. 
    Look at the following source code and simulate the EXACT terminal output that would occur when this code runs.
    Return exactly 6-8 lines of realistic terminal logs.
    
    CODE:
    ${codeSummary}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text
      .replace(/```[a-z]*\n/g, '')
      .replace(/```/g, '')
      .split('\n')
      .filter(l => l.trim().length > 0);
  } catch (error) {
    console.error("Gemini Simulation Error:", error);
    return fallback;
  }
};
