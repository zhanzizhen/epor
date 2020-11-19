import fs from "fs";
import { isInRange, initialLogger, padTargetDir } from "./utils";
import { configFilePath } from "./getConfig";

const logText: messageItem[] = [];
let globalConfig: iEporConfig;
let globalTime: TimeOption | number;

// 从.git文件夹读取message
function readMessageFromFile(targetDir: targetDir) {
  targetDir.forEach(async (dir) => {
    fs.readdir(dir, (err, data) => {
      if (err) {
        throw err;
      }
      if (!Array.isArray(data)) {
        return;
      }
      data.forEach((fileName) => {
        fs.readFile(`${dir}/${fileName}`, (err, data) => {
          if (err || !data) {
            throw new Error();
          }
          handleBranchMessage(data.toString());
        });
      });
    });
  });
}

//
function addMessage(text: string, timeStamp: number) {
  const commitMessage = text.match(/\scommit:\s(.+)/);
  if (commitMessage !== null && commitMessage.length < 2) {
    throw new Error("碰到代码逻辑的bug");
  }
  if (commitMessage) {
    logText.push({
      message: commitMessage[1],
      timeStamp,
    });
  }
}

function handleBranchMessage(branchLogText: string) {
  if (!globalConfig) {
    return;
  }
  const branchLogList = branchLogText.split("\n");
  for (let i = branchLogList.length - 1; i >= 0; i--) {
    const singleLog = branchLogList[i];
    // fing logs created by the user
    const isBelongsToUser = new RegExp(
      `[a-z0-9]{10,50} ${globalConfig.userName} `
    ).test(singleLog);
    if (isBelongsToUser) {
      const timeResult = singleLog.match(/> (\d{8,12}) /);
      if (!timeResult) {
        continue;
      }
      const timeStamp = Number(timeResult[1]);
      const result = isInRange(timeStamp, globalTime);
      if (result === "valid") {
        addMessage(singleLog, timeStamp);
      } else if (result === "tooOld") {
        break; // 所以后面的都是旧的，不必遍历
      }
    }
  }
}

export default function getReportList(
  config: iEporConfig,
  time: TimeOption | number
): void {
  const { targetDir, logger = initialLogger } = config;
  if (!targetDir?.length) {
    console.log(`请先配置你要抓取的项目目录(targetDir) 
    配置文件地址：${configFilePath}`);
    return;
  }
  globalConfig = config;
  globalTime = time;
  function printReport() {
    if (logText.length === 0) {
      console.log("没有找到符合的commit");
      return;
    }
    logger(logText);
  }

  const targetDirPaded = padTargetDir(targetDir);
  readMessageFromFile(targetDirPaded);
  setTimeout(printReport, 400);
}
