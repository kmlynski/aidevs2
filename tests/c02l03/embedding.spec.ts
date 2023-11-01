import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async (task) => {
  const chat = new OpenAIEmbeddings({
    modelName: "text-embedding-ada-002",
  });
  const phrase = extractPhraseFromMessage(task.msg);
  return await chat.embedQuery(`${phrase}`);
};

test.skip("C02L03, embeddinng", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("embedding");
  const task: TaskResponse = await Common.getTask(token);
  const answer = await openAiAPI(task);

  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});

function extractPhraseFromMessage(question: string): string {
  const quesionWords = question.split(" ");
  return `${quesionWords[quesionWords.length - 2]} ${
    quesionWords[quesionWords.length - 1]
  }`;
}
