import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import { AnswerResponse, TokenResponse } from "../../interfaces/Lesson1";

const openAiAPI = async () => {
  return process.env.C05L03;
};

test.skip("C05L02, google", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("google");
  await Common.getTask(token);

  const answer = await openAiAPI();
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
