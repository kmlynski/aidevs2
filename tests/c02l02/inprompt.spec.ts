import { SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async (task) => {
  const chat = new ChatOpenAI();
  const questionName = extractNameFromQuestion(task.question);
  const sources = extractSourcesAbout(task.input, questionName);
  const response = await chat.call([
    new SystemMessage(`${task.msg}
            Sources###
            ${sources}
            ###
            Query: ${task.question}\n\n
        `),
  ]);
  return response.content;
};

test.skip("C02L02, inprompt", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("inprompt");
  const task: TaskResponse = await Common.getTask(token);
  const answer = await openAiAPI(task);

  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});

function extractNameFromQuestion(question: string) {
  const quesionWords = question.split(" ");
  return quesionWords[quesionWords.length - 1].slice(0, -1);
}

function extractSourcesAbout(
  sources: string[],
  questionName: string
): string[] {
  return sources.filter((text) => text.includes(questionName));
}
