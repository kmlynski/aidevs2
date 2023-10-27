import axios from "../axiosInterceptor";
import {
  AnswerResponse,
  TaskResponse,
  TokenResponse,
} from "../interfaces/Lesson1";

export default class Common {
  static async getToken(taskname: string): Promise<string> {
    const response = await axios.post<TokenResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/token/${taskname}`,
      {
        apikey: process.env.AI_DEVS_API_KEY,
      }
    );

    return response.data.token === undefined ? "" : response.data.token;
  }

  static async getTask(token: string): Promise<TaskResponse> {
    const response = await axios.get<TaskResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/task/${token}`
    );

    return response.data;
  }

  static async sendAnswer(
    token: string,
    answerText: any
  ): Promise<AnswerResponse> {
    const response = await axios.post<AnswerResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/answer/${token}`,
      {
        answer: answerText,
      }
    );
    return response.data;
  }
}
