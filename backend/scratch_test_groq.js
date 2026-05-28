import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const test = async () => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say hello!" }],
      model: "llama-3.1-8b-instant",
    });
    console.log(chatCompletion.choices[0].message.content);
  } catch (error) {
      console.error(error.message);
  }
}

test();