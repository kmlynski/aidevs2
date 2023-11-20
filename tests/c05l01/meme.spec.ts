import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";
import axios from "axios";

const openAiAPI = async (task) => {
  let body = {
    template: "chubby-starlings-swim-tensely-1738",
    data: {
      "textPlaceholder.text": task.text,
      "imagePlaceholder.src": task.image,
    },
  };
  let response = await axios.post(
    "https://get.renderform.io/api/v2/render",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${process.env.RENDER_FORM_API_KEY}`,
      },
    }
  );
  return response.data.href;
};

test.skip("C05L01, meme", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("meme");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
