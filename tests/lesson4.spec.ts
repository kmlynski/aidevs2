import { expect, test } from "@playwright/test";
import Common from "../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../interfaces/Lesson1";
import ApiOpenAI from "../api/apiOpenai";

test("Lesson 4, moderation", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("moderation");
  const task: TaskResponse = await Common.getTask(token);
  const testData = task.input;
  let output: Array<number> = new Array();
  for (let i = 0; i <= 3; i++)
    output.push(await ApiOpenAI.checkIfSentenceIsOk(testData[i]));
  console.log(output);
  const result: AnswerResponse = await Common.sendAnswer(token, output);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
