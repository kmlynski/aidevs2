import { Page, test } from "@playwright/test";
import OpenAI from "openai";

const sendPrompt = async (context, links) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });

  console.log(`Authorization in OpenAI succesfull`);
  console.log("Sending request...");
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an assistant of Senior test automation engineer that has only one specific job. You return PageObject class with locators provided in context below:
        ###
        Context:
        buttons:
        ${context}
        links:
        ${links}
        ### 
        
        Format:

        export default class PageObject {
          constructor(protected page: Page) {
            this.page = page;
          }
        locators : {
            buttons: {
                button1: this.page.getByText({innerText})
            },
            links: {
              link1: this page.locator('a[href="{href}"');
            }
        }`,
      },
    ],
  });
  return response.choices[0].message.content;
};

test("Create PageObject", async ({ page }) => {
  await page.goto("https://google.com");

  const buttonsTexts = await getButtonsTexts(page);

  const linksHrefs = await getLinksHrefs(page);

  await sendPrompt(buttonsTexts, linksHrefs);
});

async function getLinksHrefs(page: Page) {
  let links = await page.locator("a").all();
  let linksTextsPromises = links.map(
    async (link) => await link.getAttribute("href")
  );

  const linksHrefs = await Promise.all(linksTextsPromises);
  console.log(`Your links hrefs: \n ${linksHrefs}`);
  return linksHrefs;
}

async function getButtonsTexts(page: Page) {
  let buttons = await page.locator("button").all();
  let buttonsTextsPromises = buttons.map(
    async (button) => await button.innerText()
  );

  const buttonsTexts = await Promise.all(buttonsTextsPromises);
  console.log(`Your buttons: \n ${buttonsTexts}`);
  return buttonsTexts;
}
