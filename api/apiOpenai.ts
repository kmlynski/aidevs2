import axios from "../axiosInterceptor";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../interfaces/Lesson1";

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
}
