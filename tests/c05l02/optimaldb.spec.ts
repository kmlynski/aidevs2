import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";
import axios from "axios";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SystemMessage } from "langchain/schema";

const openAiAPI = async (task) => {
  let database = (await axios.get(task.database)).data;
  const chat = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });
  const optimizedFacts = await chat.call([
    new SystemMessage(`
            System###
            Jesteś asystentem, który z podanych faktów zwraca sparafrazowaną liste faktów na temat poszczególnych osób. Każdy fakt moze mieć maksymalnie 3 słowa. Zachowaj liczbe faktów niezmienioną
            ###
            Zygfryd:
            ${JSON.stringify(database)}
        `),
  ]);

  return optimizedFacts.content;
};

test.skip("C05L02, optimaldb", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("optimaldb");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
