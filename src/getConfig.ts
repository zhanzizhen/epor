import fs from "fs";
import path from "path";
import { iEporConfig } from "./epor.template";

const CONFIG_FILE_NAME = "epor.config.js";

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
      fs.readFile(path.resolve("./template/epor.template.js"), (err, res) => {
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
