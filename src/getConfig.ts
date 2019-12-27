import fs from "fs";
import path from "path";
import { iEporConfig } from "./index.d";

const CONFIG_FILE_NAME = "epor.config.js";
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string): string =>
  path.resolve(appDirectory, relativePath);

function getUserHome() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

const configFilePath = `${getUserHome()}/${CONFIG_FILE_NAME}`;

export default function getConfigAsync() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(configFilePath)) {
      const config = require(configFilePath) as iEporConfig;
      resolve(config);
    } else {
      reject();
      fs.readFile(resolveApp("template/epor.template.js"), (err, res) => {
        if (err) {
          throw err;
        }
        fs.writeFile(configFilePath, res.toString(), err => {
          if (err) throw err;
          console.log(`
            初次使用，请配置 ${configFilePath}
          `);
        });
      });
    }
  });
}
