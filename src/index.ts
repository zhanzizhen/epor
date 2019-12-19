import chalk from "chalk";
import { consoleVersion, consoleHelp } from "./consoleHelp";
import checkUpdate from "./checkUpdate";
import getConfigAsync from "./getConfig";
import { iEporConfig, genOption } from "./index.d";
import getReportList from "./getReportList";

function executeCommand() {
  const script = process.argv[2];
  const option = process.argv[3] as genOption;
  switch (script) {
    case "generate":
      getConfigAsync()
        .then(config => {
          getReportList(config as iEporConfig, option);
        })
        .catch((e: Error) => {
          chalk.red(e.message);
        });
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
    default:
      console.log(
        chalk.red(
          `Unsupported command or option ${chalk.underline.bold(script)}.`
        )
      );
      consoleHelp();
  }
}

checkUpdate();
executeCommand();
