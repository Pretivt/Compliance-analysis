import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const test = async () => {
  try {
    const text = "This is a test product.";
    console.log("Generating embedding...");
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text,
    });
    console.log("Response type:", typeof response);
    console.log("Is Array?", Array.isArray(response));
    if (Array.isArray(response)) {
        console.log("Length:", response.length);
        console.log("First element:", response[0]);
        console.log("Is nested array?", Array.isArray(response[0]));
        if (Array.isArray(response[0])) {
             console.log("Inner length:", response[0].length);
        }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};

test();