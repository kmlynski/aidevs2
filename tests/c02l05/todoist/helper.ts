import { BaseMessageChunk } from "langchain/schema";

export const currentDate = () => {
  let date = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];

  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-based in JS
  let day = date.getDate().toString().padStart(2, "0");
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${weekday}, ${month}/${day}/${year} ${hours}:${minutes}`;
};

export const parseFunctionCall = (
  result: BaseMessageChunk
): { name: string; args: any } | null => {
  if (result?.additional_kwargs?.function_call === undefined) {
    return null;
  }
  return {
    name: result.additional_kwargs.function_call.name,
    args: JSON.parse(result.additional_kwargs.function_call.arguments),
  };
};
