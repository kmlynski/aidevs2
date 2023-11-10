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
            Jesteś asystentem, który z podanego tekstu zwraca imie i nazwisko osoby, której dotyczy pytanie. 
            WAŻNE: Jeżeli podane jest zdrobnienie imienia, zamień je na imie bez zdrobnienia. 
            
            Przykład: 
            - Krysia => Krystyna
            - Zosia => Zofia
            
            Format:
            {"imie":XXX, "nazwisko":XXX}

            ###
            Pytanie: ${task.question}\n\n
        `),
  ]);
  let nameAndSurname = JSON.parse(response.content);

  let peopleResponse = await axios.get(task.data);
  let disiredUser = peopleResponse.data.filter(
    (obj: { imie: string; nazwisko: string }) =>
      obj.imie === nameAndSurname.imie &&
      obj.nazwisko === nameAndSurname.nazwisko
  );

  console.log(disiredUser);

  const response2 = await chat.call([
    new SystemMessage(`$
            Odpowiedz na pytanie bazując na poniższych faktach:

              - O mnie: ${disiredUser[0].o_mnie}
              - ulubiona postac z kapitana bomby: ${disiredUser[0].ulubiona_postac_z_kapitana_bomby}
              - ulubiony serial: ${disiredUser[0].ulubiony_serial}
              - ulubiony film:  ${disiredUser[0].ulubiony_film}
              - ulubiony kolor:${disiredUser[0].ulubiony_kolor}
            
            ###
            Pytanie: ${task.question}\n\n
        `),
  ]);
  console.log(`AI: ${response2.content}`);
  return response2.content;
};

test.skip("C03L05AI, people - with AI", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("people");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
