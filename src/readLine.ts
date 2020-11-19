import prompts from "prompts";

//
async function readLine(): Promise<TimeOption | number> {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "choose an item",
    choices: [
      {
        title: "today",
        description: "生成今天的日报",
        value: "--today",
      },
      {
        title: "yesterday",
        value: "--yesterday",
        description: "生成昨天的日报",
      },
      {
        title: "自定义",
        value: "CUSTOM",
        description: "自定义一个日期",
      },
      {
        title: "week",
        value: "--week",
        description: "生成前7天的周报",
      },
    ],
  });
  if (response.value === "CUSTOM") {
    const date = await prompts({
      type: "date",
      name: "choosedDay",
      message: `choose one day`,
      mask: "YYYY-MM-DD",
      validate: (date) =>
        date > Date.now() ? `Your choosen day can't be in the future` : true,
    });
    return (date.choosedDay as Date).setHours(0, 0, 0, 0) / 1000;
  }
  return response.value;
}

export default readLine;
