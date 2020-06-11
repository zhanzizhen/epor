import chalk from "chalk";
import { consoleVersion, consoleHelp } from "./consoleHelp";
import checkUpdate from "./checkUpdate";
import getConfigAsync from "./getConfig";
import { iEporConfig, Time } from "./index.d";
import getReportList from "./getReportList";
import readLine from "./readLine";

function executeGenerateCommand(time: string) {
  if ((["--yesterday", "-y", "--today", "-t"]).includes(time)) {
    getConfigAsync()
      .then(config => {
        getReportList(config as iEporConfig, time as Time);
      })
      .catch((e: Error) => {
        console.log(chalk.red(e.message));
      });
    return;
  }
  console.log(chalk.yellow(`Unsupported option ${chalk.bgRed.bold(time)}.`));
}

async function executeCommand() {
  const script = process.argv[2];
  const time = process.argv[3];
  switch (script) {
    case "generate":
      executeGenerateCommand(time);
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
