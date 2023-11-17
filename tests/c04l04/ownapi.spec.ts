import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async () => {
  return process.env.C04L04;
};

test.skip("C04L04, ownapi", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("ownapi");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI();
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
