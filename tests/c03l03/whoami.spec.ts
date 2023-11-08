import { expect, test } from "@playwright/test";
import Common from "../../api/common";
import { AnswerResponse, TaskResponse } from "../../interfaces/Lesson1";
import { BufferWindowMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

const openAiAPI = async () => {
  let response;
  let token;
  const chat = new ChatOpenAI({ temperature: 0.1 });
  const memory = new BufferWindowMemory({ k: 6 });
  const chain = new ConversationChain({ llm: chat, memory: memory });

  let question = `I will be giving you hints about famous person. 
                    Important!: Your job is to answer 'Yes' and give me a name when you will be sure who is this. Do not guess.
                    Example:
                    Yes! His name is: {name of famous person}`;

  await chain.call({
    input: question,
  });

  await expect
    .poll(
      async () => {
        token = await Common.getToken("whoami");
        const task: TaskResponse = await Common.getTask(token);
        console.warn(`USER HINT:`, task.hint);

        response = await chain.call({
          input: task.hint,
        });
        console.warn(`AI:`, response);
        return response.response;
      },
      {
        message: "Chat is not able to recognize the person",
        intervals: [1_000, 2_000, 4_000, 8_000, 16_000],
      }
    )
    .toMatch(new RegExp(/Yes|Tak/));
  return { token, response };
};

test("C03L03, whoami", async () => {
  const { token, response } = await openAiAPI();
  const result: AnswerResponse = await Common.sendAnswer(
    token,
    response.response
  );
  expect(result.code).toBe(0);
  expect(result.msg).toBe("OK");
  expect(result.note).toBe("CORRECT");
});
