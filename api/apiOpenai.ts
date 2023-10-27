import axios from "../axiosInterceptor";

export default class ApiOpenAI {
  static async checkIfSentenceIsOk(data: string): Promise<number> {
    const response = await axios.post(
      "https://api.openai.com/v1/moderations",
      {
        input: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.results[0].flagged === false ? 0 : 1;
  }

  static async getPizzaRecipeBlogPost(rules: string[]) {
    let response1 = await this.sendRequestToChat(
      `Napisz 2 zdania wstępu do bloga na temat hisorii pizzy. Tytul akapitu to ${rules[0]}`
    );
    let response2 = await this.sendRequestToChat(
      `Wypisz 3 niezbędne skladniki na pizze, tytuł akapitu bloga to ${rules[1]}`
    );
    let response3 = await this.sendRequestToChat(
      `Wypisz w 3 krokach jak wyrobic ciasto na pizze, tytuł akapitu bloga to ${rules[2]}`
    );
    let response4 = await this.sendRequestToChat(
      `Wypisz w 2 zdaniach w jak dlugo i w jakiej temeperaturze piec pizze  , tytuł akapitu bloga to${rules[3]}`
    );
    let blogPost = new Array();
    blogPost.push(response1);
    blogPost.push(response2);
    blogPost.push(response3);
    blogPost.push(response4);
    console.log(blogPost);
    return blogPost;
  }

  static async sendRequestToChat(prompt: string) {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${prompt}` }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  }
}
