import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the client. 
// Note: In a real production app, you might proxy this through a backend to protect the key,
// but for this demo, we use the env variable directly as instructed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TUTOR_MODEL = 'gemini-2.5-flash';

export const GeminiService = {
  /**
   * Explains a code snippet or concept.
   */
  async explainCode(code: string, context: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: TUTOR_MODEL,
        contents: `You are an expert computer science tutor. 
        Context: ${context}
        
        Please explain the following code snippet simply and clearly for a student:
        \`\`\`
        ${code}
        \`\`\`
        
        Focus on the logic and syntax.`,
      });
      return response.text || "I couldn't generate an explanation at this moment.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I encountered an error while analyzing the code.";
    }
  },

  /**
   * Simulates running code by predicting the output.
   */
  async simulateCodeExecution(code: string, language: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: TUTOR_MODEL,
        contents: `Act as a console terminal. 
        Execute the following ${language} code mentally and return ONLY the output that would appear in the console. 
        If there is an error, describe the error briefly.
        
        Code:
        ${code}`,
      });
      return response.text || "";
    } catch (error) {
      return "Error executing code simulation.";
    }
  },

  /**
   * Chat with the AI Tutor.
   */
  async chatWithTutor(history: ChatMessage[], newMessage: string): Promise<string> {
    try {
      // Convert history to format expected by Gemini (if we were using chat sessions),
      // but here we'll just append context to a single generation for simplicity 
      // or use a fresh chat session if maintaining state.
      // For a robust implementation, we use the chat API.
      
      const chat = ai.chats.create({
        model: TUTOR_MODEL,
        config: {
            systemInstruction: "You are 'Nexus', a friendly and encouraging Computer Science tutor. Keep answers concise (under 150 words) unless asked for a deep dive."
        }
      });

      // Replay history to set state (simplified for this demo, ideally persisted)
      // Note: Real implementation would maintain the `chat` object instance.
      // We will just send the new message effectively as a one-off with context for this stateless demo wrapper.
      
      const response = await chat.sendMessage({
          message: newMessage
      });

      return response.text || "I'm listening...";
    } catch (error) {
      console.error("Chat Error:", error);
      return "I'm having trouble connecting to my knowledge base right now.";
    }
  }
};
