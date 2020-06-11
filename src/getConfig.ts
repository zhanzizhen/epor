import fs from "fs";
import { iEporConfig } from "./index.d";
import defaultConfigStr from "./epor.template";

const CONFIG_FILE_NAME = "epor.config.js";

function getUserHome() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

export const configFilePath = `${getUserHome()}/${CONFIG_FILE_NAME}`;

export default async function getConfigAsync() {
  if (fs.existsSync(configFilePath)) {
    const config = require(configFilePath) as iEporConfig;
    return config;
  } else {
    fs.writeFile(configFilePath, defaultConfigStr, err => {
      if (err) throw err;
    });
    throw new Error(
      `初次使用，请先进行配置哦(^-^)
       配置文件路径： ${configFilePath}`
    );
  }
}
