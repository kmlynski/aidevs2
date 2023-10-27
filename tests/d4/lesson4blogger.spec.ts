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

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `answer truthfully, as briefly as possible. ###context: Headings of a blog: ${JSON.stringify(
          task.blog
        )}`,
      },
      {
        role: "user",
        content:
          'Return headings from context in a format ["heading1","heading2","heading3","heading4"]. Concat 1 sentence to every heading',
      },
    ],
  });

  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
};

test("Lesson 4X, blogger - alternative way ", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("blogger");
  const task: TaskResponse = await Common.getTask(token);
  const answer = await openAiAPI(task);

  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
