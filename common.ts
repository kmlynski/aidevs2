import axios from "axios";

export default class Common {
  static async getToken(taskname: string) {
    const response = await axios.post<TokenResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/token/${taskname}`,
      {
        apikey: process.env.AI_DEVS_API_KEY,
      }
    );

    console.log("Token response status is: ", response.status);
    console.log("Token response is: ", response.data);

    return response.data.token === undefined ? "" : response.data.token;
  }

  static async getTask(token: string): Promise<TaskResponse> {
    const response = await axios.get<TaskResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/task/${token}`
    );

    console.log("Task status is: ", response.status);
    console.log("Task answer response is: ", response.data);

    return response.data;
  }

  static async sendAnswer(
    token: string,
    answerText: string
  ): Promise<AnswerResponse> {
    const response = await axios.post<AnswerResponse>(
      `${process.env.AI_DEVS_API_BASE_URL}/answer/${token}`,
      {
        answer: answerText,
      }
    );
    console.log("Setting answer status is: ", response.status);
    console.log("Setting answer response is: ", response.data);
    return response.data;
  }
}
