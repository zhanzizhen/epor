import chalk from "chalk";
import { consoleVersion, consoleHelp } from "./consoleHelp";
import checkUpdate from "./checkUpdate";
import getConfigAsync from "./getConfig";
import { iEporConfig, genOption } from "./index.d";
import getReportList from "./getReportList";
import readLine from "./readLine";

function executeGenerateCommand(option: string) {
  if (["--yesterday", "-y", "--today", "-t"].includes(option)) {
    getConfigAsync()
      .then(config => {
        getReportList(config as iEporConfig, option as genOption);
      })
      .catch((e: Error) => {
        // if (e.message === "CONFIG_FILE_NOT_FOUND") {
        //   console.log(chalk.yellow("初次使用，请配置 ${configFilePath}"));
        //   return;
        // }
        console.log(chalk.red(e.message));
      });
    return;
  }
  console.log(chalk.yellow(`Unsupported option ${chalk.bgRed.bold(option)}.`));
}

async function executeCommand() {
  const script = process.argv[2];
  const option = process.argv[3];
  switch (script) {
    case "generate":
      executeGenerateCommand(option);
      break;
    case "--help":
    case "-h":
      consoleHelp();
      break;
    case "--version":
    case "-v":
      consoleVersion();
      break;
    case undefined:
      const optionFromSelect = await readLine();
      executeGenerateCommand(optionFromSelect);
      break;
    default:
      console.log(
        chalk.yellow(
          `Unsupported command or option ${chalk.underline.bold(script)}.`
        )
      );
      consoleHelp();
  }
}

checkUpdate();
executeCommand();
