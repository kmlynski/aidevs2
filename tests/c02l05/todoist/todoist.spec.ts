import { test } from "@playwright/test";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { currentDate, parseFunctionCall } from "./helper.ts";
import { addProject, deleteProject, getProjects } from "./todoist.ts";
import {
  addProjectSchema,
  deleteProjectSchema,
  getProjectsSchema,
} from "./schema";
import { Project } from "./todoist.dt.ts";

test("C02L05.1, todoist", async ({}) => {
  const model = new ChatOpenAI({ modelName: "gpt-4-0613" }).bind({
    functions: [addProjectSchema, getProjectsSchema, deleteProjectSchema],
  });
  const tools = {
    addProject,
    getProjects,
    deleteProject,
  };
  const act = async (query: string) => {
    console.log("User: ", query);
    const projects: Project[] = await getProjects();
    const conversation = await model.invoke([
      new SystemMessage(`
              Fact: Today is ${currentDate()}
              Current projects: ###${projects
                .map(
                  (project: any) => project.name + " (ID: " + project.id + ")"
                )
                .join(", ")}###`),
      new HumanMessage(query),
    ]);
    let response = "";
    const action = parseFunctionCall(conversation);

    if (action) {
      console.log(`action: ${action.name}`);
      response = await tools[action.name](action.args.projects);
    } else {
      response = conversation.content;
    }
    console.log(`AI: ${JSON.stringify(response)}\n`);
    return response;
  };

  await act("I'm starting new course on eduweb on Monday , can you add it?");
  await act("Get my projects again.");
  await act("Delete last project that you've added");
});
