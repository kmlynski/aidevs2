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

  const moderation = await openai.moderations.create({ input: task.input });
  const answer = moderation.results.map((el) => (el.flagged ? 1 : 0));

  return answer;
};

test.skip("Lesson4.1, moderation - alternative way ", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("moderation");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
