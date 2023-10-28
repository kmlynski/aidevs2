import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import OpenAI from "openai";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async (task) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  let content = `Q: Does the response \"${task.answer}\" answers the question ${task.question} `;
  console.warn(content);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You can only answer with "YES" if sentence is true or "NO" if it's false. Do not use any dots. You can only write with capital letters. `,
      },
      {
        role: "user",
        content: content,
      },
    ],
  });
  console.warn(`AI: ${response.choices[0].message.content}`);
  return response.choices[0].message.content;
};

test.skip("Lesson 5, liar", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("liar");
  const task: TaskResponse = await Common.postTask(
    token,
    "What is capital of France?"
  );
  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
