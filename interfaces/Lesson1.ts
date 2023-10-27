export interface TokenResponse {
  code: number;
  msg: string;
  token: string;
}

export interface TaskResponse {
  code: number;
  msg: string;
  cookie?: string;
  input?: any;
  blog?: any;
  question?: string;
}

export interface AnswerResponse {
  code: number;
  msg: string;
  note: string;
}
