import chalk from "chalk";
import { consoleVersion, consoleHelp } from "./consoleHelp";
import checkUpdate from "./checkUpdate";
import getConfigAsync from "./getConfig";
import { iEporConfig } from "./epor.template";
import getReportList from "./getReportList";

function executeCommand() {
  const script = process.argv[2];
  switch (script) {
    case undefined:
    case "generate":
      getConfigAsync().then((config) => {
        getReportList(config as iEporConfig);
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
