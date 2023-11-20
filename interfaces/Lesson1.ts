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
  hint?: string;
  service?: string;
  image?: string;
  text?: string;
}

export interface AnswerResponse {
  code: number;
  msg: string;
  note: string;
}
