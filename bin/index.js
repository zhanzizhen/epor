#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const { consoleVersion, consoleHelp } = require("../runtime/consoleHelp");
const checkUpdate = require("../runtime/checkUpdate");
const getConfigAsync = require("../runtime/getConfig");

function executeCommand() {
  const script = process.argv[2];
  switch (script) {
    case undefined:
      getConfigAsync().then(config => {
        console.log(config)
        require("../lib")(config);
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
