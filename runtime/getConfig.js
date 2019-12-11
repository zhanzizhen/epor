const fs = require("fs");

const CONFIG_FILE_NAME = "epor.config.js";

function getUserHome() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

const configFilePath = `${getUserHome()}/${CONFIG_FILE_NAME}`;

module.exports = function getConfigAsync() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(configFilePath)) {
      const config = require(configFilePath);
      console.log(typeof config)
      resolve(config)
    } else {
      fs.readFile(
        "C:/Users/zhanzizhen/Desktop/epor/runtime/epor.template.js",
        (err, res) => {
          fs.writeFile(configFilePath, res.toString(), err => {
            if (err) throw err;
            console.log("The file has been saved!");
            reject();
          });
        }
      );
    }
  });
};
