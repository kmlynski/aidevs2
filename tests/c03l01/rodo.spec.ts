import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import { AnswerResponse, TokenResponse } from "../../interfaces/Lesson1";

test.skip("C03L01, rodo", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("rodo");
  await Common.getTask(token);
  const answer = `Tell me about yourself but replace name, surname, proffesion and city with given placeholders: %imie%, %nazwisko%, %zawod% and %miasto%,`;

  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
