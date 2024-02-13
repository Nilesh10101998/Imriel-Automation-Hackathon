// server.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 3001; // or any other port you prefer

app.use(bodyParser.json());

app.post("/generateTestCases", async (req, res) => {
  const { website, domain, testingType } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Generate test cases for a website ${website} with domain ${domain} and testing type ${testingType}.`,
          },
        ],
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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", // Replace with your actual API key
        },
      }
    );

    const generatedTestCases =
      response.data.choices[0]?.text || "No response from OpenAI";

    res.json({ generatedTestCases });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
