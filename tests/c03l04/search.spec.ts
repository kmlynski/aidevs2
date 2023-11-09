import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import { AnswerResponse, TokenResponse } from "../../interfaces/Lesson1";
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const openAiAPI = async () => {
  const COLLECTION_NAME = "ai_devs9";
  const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });
  const embeddings = new OpenAIEmbeddings({ maxConcurrency: 5 });
  const query = "Co różni pseudonimizację od anonimizowania danych?";
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

test("C03L04, search", async ({}) => {
  const token: TokenResponse["token"] = await Common.getToken("search");
  await Common.getTask(token);

  const answer = (await openAiAPI()) as string;
  const answerWithoutWhiteSpaces = answer.replace(/(\s|\")/g, "");

  const result: AnswerResponse = await Common.sendAnswer(
    token,
    answerWithoutWhiteSpaces
  );
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
