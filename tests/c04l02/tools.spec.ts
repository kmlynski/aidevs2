import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { currentDate } from "./helper";

const openAiAPI = async (task) => {
  const chat = new ChatOpenAI({ modelName: "gpt-4-0613" });
  const conversation = await chat.invoke([
    new SystemMessage(`
          Fact: Today is ${currentDate()}
          ${task.msg}
          If user provided a date, use YYYY-MM-DD format
            
          Examples:
          Przypomnij mi, że mam kupić mleko = {"tool":"ToDo","desc":"Kup mleko" }
          Jutro mam spotkanie z Marianem = {"tool":"Calendar","desc":"Spotkanie z Marianem","date":"2023-11-15"}
          
        `),
    new HumanMessage(task.question),
  ]);
  return JSON.parse(conversation.content);
};

test.skip("C04L02, tools ", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("tools");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
