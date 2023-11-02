import { OpenAI, toFile } from "openai";
import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";

const openAiAPI = async (task) => {
  const chat = new OpenAI();
  const url = extractUrlFromMessage(task.msg);
  const fetchedAudioResponse = await fetch(url);
  const file = await toFile(fetchedAudioResponse);
  const { text: transcript } = await chat.audio.transcriptions.create({
    file,
    model: "whisper-1",
  });
  return transcript;
};

test.skip("C02L04, whisper", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("whisper");
  const task: TaskResponse = await Common.getTask(token);
  const answer = await openAiAPI(task);

  const result: AnswerResponse = await Common.sendAnswer(token, answer);

  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});

function extractUrlFromMessage(msg: string): string {
  return msg.split("file: ")[1];
}
