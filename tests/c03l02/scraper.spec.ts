import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import OpenAI from "openai";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async (task, content) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `${task.msg}
        ###
        Context:
        ${content}`,
      },
      {
        role: "user",
        content: task.question,
      },
    ],
  });
  console.warn(`AI: ${response.choices[0].message.content}`);
  return response.choices[0].message.content;
};

test("C03L02, scraper", async ({ page }) => {
  const token: TokenResponse["token"] = await Common.getToken("scraper");
  const task: TaskResponse = await Common.getTask(token);

  const pageContent = await expect
    .poll(
      async () => {
        console.log("Trying to get content");
        await page.goto(`${task.input}`);
        return await page.content();
      },
      {
        message: "Server returned error",
        intervals: [1_000, 2_000, 4_000, 8_000, 16_000],
      }
    )
    .not.toContain("X_X");

  const answer = await openAiAPI(task, pageContent);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
