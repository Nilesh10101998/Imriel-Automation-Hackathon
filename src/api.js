// api.js
import axios from "axios";

const OPENAI_API_KEY = "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"; // Replace with your actual OpenAI API key

export const generateTestCases = async (website, domain, testingType, action) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Generate ${action} for a website ${website} with domain ${domain} and testing type ${testingType}`,
          },
        ],
        max_tokens: 300,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
      {}
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating test cases:", error);
    throw error;
  }
};
