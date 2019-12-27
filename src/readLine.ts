import prompts from "prompts";
import { genOption } from "./index.d";

//
async function readLine(): Promise<genOption> {
  const response = await prompts({
    type: "select",
    name: "value",
    message: "choose an item",
    choices: [
      {
        title: "today",
        description: "生成今天的日报",
        value: "--today"
      },
      {
        title: "yesterday",
        value: "--yesterday",
        description: "生成昨天的日报"
      },
      {
        title: "week",
        value: "--week",
        description: "This feature is developing",
        disabled: true
      }
    ],
  });
  return response.value;
}

export default readLine;
