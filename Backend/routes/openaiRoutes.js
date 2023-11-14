const express = require("express");
const OpenAI = require("openai");
const prompt = require("../utils/promptgenerator");
const jwtSecurity = require("../middleware/auth.middleware");
const UserModel = require("../models/user.model");

const openaiRouter = express.Router();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: "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",
});

// Initialize a variable to store conversation state
let conversationState = {
  messages: [],
};

// Endpoint to start the interview
openaiRouter.post(
  "/start-interview",
  jwtSecurity.verifyToken,
  async (req, res) => {
    try {
      const { techStack, options } = req.body;
      // Hardcoded prompt to start the interview
      const startInterviewPrompt = prompt.startPrompt(techStack, options);
      // Set up the conversation state with the system message and user prompt
      conversationState = {
        messages: [
          { role: "system", content: startInterviewPrompt },
          {
            role: "user",
            content: "Start the interview",
          },
        ],
      };

      // Send the initial prompt to OpenAI and get the assistant's response
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationState.messages,
      });

      // Extract the assistant's response
      const assistantResponse = response.choices[0]?.message?.content;

      conversationState.messages.push({
        role: "assistant",
        content: assistantResponse,
      });

      // Send the assistant's response to the user
      console.log(conversationState);
      res.status(200).json({ role: "assistant", content: assistantResponse });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// Endpoint to get the next answer from the user
openaiRouter.post("/next-answer", jwtSecurity.verifyToken, async (req, res) => {
  try {
    // Extract the user's answer from the request body
    const userAnswer = req.body.answer;

    // Add the user's answer to the conversation state
    conversationState.messages.push({ role: "user", content: userAnswer });

    // Send the updated conversation state to OpenAI and get the assistant's response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationState.messages,
    });

    // Extract the assistant's response
    const assistantResponse = response.choices[0]?.message?.content;

    conversationState.messages.push({
      role: "assistant",
      content: assistantResponse,
    });

    // Send the assistant's response to the user
    console.log(conversationState);
    res.status(200).json({ role: "assistant", content: assistantResponse });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to end the interview and generate a report
openaiRouter.post(
  "/end-interview",
  jwtSecurity.verifyToken,
  async (req, res) => {
    try {
      // Hardcoded prompt to end the interview
      const endInterviewPrompt = prompt.endPrompt();

      // Add the end interview prompt to the conversation state
      conversationState.messages.push({
        role: "user",
        content: endInterviewPrompt,
      });

      // Send the final conversation state to OpenAI and get the assistant's response
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationState.messages,
      });

      // Extract the assistant's response
      const assistantResponse = response.choices[0]?.message?.content;
      conversationState.messages.push({
        role: "assistant",
        content: assistantResponse,
      });

      // Send the interview report to the user
      console.log(conversationState);
      const numbers = assistantResponse.match(/\b[0-9]\b/g);
      const user = await UserModel.findById(req.userId, { password: 0 });
      user.scores.push({
        Subject_Matter: numbers[0],
        Communication: numbers[1],
        Interview: numbers[2],
      });
      await user.save();
      res.status(200).json({ role: "assistant", content: assistantResponse });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = openaiRouter;
