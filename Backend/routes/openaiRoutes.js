const express = require("express");
const OpenAI = require("openai");

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
openaiRouter.post("/start-interview", async (req, res) => {
  try {
    const { stack, options } = req.body;
    // Hardcoded prompt to start the interview
    const startInterviewPrompt = `You are a virtual interviewer conducting an interview with a candidate for a ${stack} stack developer position. You may ask questions on following topics ${options.join(
      " "
    )} ,you MUST Ask questions one by one and not all at once,it is very important you ask only one question at a time ,dont ask "are you ready" or "introduce yourself", wait for the candidate to repond you back with an answer , then ask the next question, Judge the responses by candiate on the Subject matter expertise and commmunication skills on a scale of 1 -10,Candidate may ask you to end the interview, after the candiate has ended the interview , generate a report with average score in both subject matter expertise and coommunication skills`;

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
    res.json({ role: "assistant", content: assistantResponse });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Endpoint to get the next answer from the user
openaiRouter.post("/next-answer", async (req, res) => {
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
    res.json({ role: "assistant", content: assistantResponse });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Endpoint to end the interview and generate a report
openaiRouter.post("/end-interview", async (req, res) => {
  try {
    // Hardcoded prompt to end the interview
    const endInterviewPrompt =
      "End the interview,give feedback and generate the report,, you MUST mention average score in Subject Matter Expertise and Communication Skills, taking context from previous answers.";

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
    res.json({ message: assistantResponse });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = openaiRouter;
