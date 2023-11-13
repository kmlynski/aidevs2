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
  const chat = new ChatOpenAI();
  const response = await chat.call([
    new SystemMessage(`${task.msg}
            System###
            Jesteś asystentem, który z podanego tekstu zwraca kod waluty lub kraj którego dotyczt pytanie 
            
 
            Format:
            {"waluta":"$WALUTA"} jeśli dotyczy waluty,
            {"kraj": "$KRAJ"} jeśli dotyczy waluty

            ###
            Pytanie: ${task.question}\n\n
        `),
  ]);
  let currencies = await axios.get(
    "http://api.nbp.pl/api/exchangerates/tables/a?format=json"
  );
  let populations = await axios.get("https://restcountries.com/v3.1/all");
  let result;
  let jsonParsed = JSON.parse(response.content);
  if (jsonParsed.waluta) {
    let temp = currencies.data.filter(
      (obj: { waluta: string }) => obj.waluta === jsonParsed.waluta
    );
    result = temp.mid;
  } else if (jsonParsed.kraj) {
    let temp = populations.data.filter(
      (obj) => obj.translations.pol.common === jsonParsed.kraj
    );
    result = temp[0].population;
  }

  console.log(`AAAAAAAAAAA ${result}`);
  const response2 = await chat.call([
    new SystemMessage(`$
            Odpowiedz na pytanie bazując na poniższych faktach, odpowiadaj jak najkrócej jak się da.

            ${result}

            ###
            Pytanie: ${task.question}\n\n
        `),
  ]);
  console.log(`AI: ${response2.content}`);
  return response2.content;
};

test.skip("C04L01, knowledge - with AI", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("knowledge");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
