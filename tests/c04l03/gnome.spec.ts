import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

const openAiAPI = async (task) => {
  const chat = new ChatOpenAI({ modelName: "gpt-4-vision-preview" });
  const messages = [
    new HumanMessage({
      role: "user",
      content: [
        {
          type: "text",
          text: `${task.msg}`,
        },
        {
          type: "image_url",
          image_url: {
            url: `${task.url}`,
          },
        },
      ],
    }),
  ];
  const response = await chat.predictMessages(messages);

  return response.content;
};

test.skip("C04L03, gnome", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("gnome");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
