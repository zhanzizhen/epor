import chalk from "chalk";
import { consoleVersion, consoleHelp } from "./consoleHelp";
import checkUpdate from "./checkUpdate";
import getConfigAsync from "./getConfig";
import getReportList from "./getReportList";
import readLine from "./readLine";

function executeGenerateCommand(time: TimeOption | number) {
  getConfigAsync()
    .then((config) => {
      getReportList(config, time);
    })
    .catch((e: Error) => {
      console.log(chalk.red(e.message));
    });
}

async function executeCommand() {
  const script = process.argv[2];
  const time = process.argv[3];
  function unSupport() {
    console.log(
      chalk.yellow(
        `Unsupported command or option ${chalk.underline.bold(script)}.`
      )
    );
    consoleHelp();
  }
  function canConvertToValidNumber(s: string) {
    const num = Number(s);
    return !Number.isNaN(num);
  }
  const TimeOptionMapExceptNumber: {
    [key in TimeOption]: 1;
  } = {
    "--yesterday": 1,
    "--week": 1,
    "--today": 1,
    "-t": 1,
    "-y": 1,
  };
  switch (script) {
    case "generate":
      if (time in TimeOptionMapExceptNumber) {
        executeGenerateCommand(time as TimeOption);
      } else if (canConvertToValidNumber(time)) {
        executeGenerateCommand(Number(time));
      } else {
        unSupport();
      }
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
      unSupport();
  }
}

checkUpdate();
executeCommand();
