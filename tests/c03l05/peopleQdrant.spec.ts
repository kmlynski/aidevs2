import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import OpenAI from "openai";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../../interfaces/Lesson1";
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const openAiAPI = async (task) => {
  const COLLECTION_NAME = "people";
  const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
  const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });
  const query = task.question;
  const queryEmbedding = await embeddings.embedQuery(query);

  //   const urlList = jsonData.map((item: any) => item.url);
  //   let filePath = join(__dirname, "names.json");
  //   writeFileSync(filePath, JSON.stringify(urlList));

  const search = await qdrant.search(COLLECTION_NAME, {
    vector: queryEmbedding,
    limit: 1,
    filter: {
      must: [
        {
          key: "source",
          match: {
            value: COLLECTION_NAME,
          },
        },
      ],
    },
  });
  console.log(search[0]!.payload!.content);
  return search[0]!.payload!.content;
};

test.skip("C03L05, people - with qdrant", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("people");
  const task: TaskResponse = await Common.getTask(token);

  const answer = await openAiAPI(task);
  const result: AnswerResponse = await Common.sendAnswer(token, answer);
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
