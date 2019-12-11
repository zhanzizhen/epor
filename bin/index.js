#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const { consoleVersion, consoleHelp } = require("../runtime/consoleHelp");
const checkUpdate = require("../runtime/checkUpdate");

function executeCommand() {
  const script = process.argv[2];
  switch (script) {
    case undefined:
      require("../lib");
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
