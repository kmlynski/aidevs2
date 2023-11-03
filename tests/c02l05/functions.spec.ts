import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import { AnswerResponse, TokenResponse } from "../../interfaces/Lesson1";

const addUserSchema = {
  name: "addUser",
  description: "adds user with provider data",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Set to the value of first argument of a function",
      },
      surname: {
        type: "string",
        description: "Set to the value of second argument of a function",
      },
      year: {
        type: "integer",
        description: "Set to the value of third argument of a function",
      },
    },
    required: ["name", "surname", "year"],
  },
};

test("C02L05, functions", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("functions");
  await Common.getTask(token);

  const result: AnswerResponse = await Common.sendAnswer(token, addUserSchema);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
