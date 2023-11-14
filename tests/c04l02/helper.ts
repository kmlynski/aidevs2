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
