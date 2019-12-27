import fs from "fs";
import path from "path";
import { iEporConfig } from "./index.d";
import defaultConfigStr from "./epor.template";

const CONFIG_FILE_NAME = "epor.config.js";
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath);

function getUserHome() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

const configFilePath = `${getUserHome()}/${CONFIG_FILE_NAME}`;

export default async function getConfigAsync() {
  if (fs.existsSync(configFilePath)) {
    const config = require(configFilePath) as iEporConfig;
    return config;
  } else {
    fs.writeFile(configFilePath, defaultConfigStr, err => {
      if (err) throw err;
    });
    throw new Error(`初次使用，请配置 ${configFilePath}`);
  }
}
