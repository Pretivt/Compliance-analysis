import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import path from'path'


dotenv.config();
console.log("File started");

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Generate a vector embedding for a given text chunk using a free Hugging Face model
 * @param {string} text - The text to vectorize
 * @returns {Promise<number[]>} - The vector embedding (array of numbers)
 */
export const generateEmbedding = async (text) => {
  try {
    console.log("Function called");
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
      
    });
    console.log("✅ Embedding generated");
    console.log("Vector length:", response.length);
    console.log(response.slice(0, 5));

     

    return response;
  } catch (error) {
    console.error("❌ Error generating embedding:", error);
    throw error;
  }
};

generateEmbedding("hello world");

