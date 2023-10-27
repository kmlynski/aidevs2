import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

test.skip("Lesson 1, helloapi", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("helloapi");
  const task: TaskResponse = await Common.getTask(token);
  const result: AnswerResponse = await Common.sendAnswer(token, task.cookie!);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
