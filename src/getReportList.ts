import fs from "fs";
import { iEporConfig, messageItem, genOption, targetDir } from "./index.d";

const logText: messageItem[] = [];

// 判断是否是今天的时间
function isInRange(gitTimeStamp: string, option: genOption): boolean {
  const todayBeginTime = new Date().setHours(0, 0, 0, 0) / 1000;
  const yesterDayBeginTime =
    new Date().setHours(0, 0, 0, 0) / 1000 - 24 * 60 * 60;
  const value = Number(gitTimeStamp);
  switch (option) {
    case undefined:
      return value >= todayBeginTime;
    case "--yesterday":
    case "-y":
      return value < todayBeginTime && value >= yesterDayBeginTime;
    default:
      throw new Error("传给generate的参数不对");
  }
}

// 从.git文件夹读取message
function getMessageFromFile(targetDir: targetDir) {
  targetDir.forEach(async dir => {
    fs.readdir(dir, (err, data) => {
      if (err) {
        throw err;
      }
      if (!Array.isArray(data)) {
        return;
      }
      data.forEach(fileName => {
        fs.readFile(`${dir}/${fileName}`, (err, data) => {
          if (err || !data) {
            throw new Error();
          }
          logText.push(data.toString());
        });
      });
    });
  });
}

//
function addMessage(commitList: messageItem[], text: string) {
  const commitMessage = text.match(/(?<=commit:\s).+/);
  if (commitMessage !== null && commitMessage.length !== 1) {
    throw new Error("碰到代码逻辑的bug");
  }
  if (commitMessage) {
    commitList.push(commitMessage[0]);
  }
}

function getReportFromMessage(
  userName: string,
  option: genOption
): messageItem[] {
  const reportCommitList: string[] = [];
  logText.forEach(branchLogText => {
    const branchLogList = branchLogText.split("\n");
    for (let i = branchLogList.length - 1; i >= 0; i--) {
      const singleLog = branchLogList[i];
      // fing logs created by the user
      const isBelongsToUser = new RegExp(`[a-z1-9]+ ${userName} `).test(
        singleLog
      );
      if (isBelongsToUser) {
        const timeStamp = singleLog.match(/(?<=>) \d{10} /);
        if (!isInRange((timeStamp as RegExpMatchArray)[0], option)) {
          break;
        }
        addMessage(reportCommitList, singleLog);
      }
    }
  });
  return reportCommitList;
}

function logger(list: messageItem[]) {
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}. ${list[i]}\n`);
  }
}

function padTargetDir(params: targetDir): string[] {
  return params.map(url => `${url}/.git/logs/refs/heads`);
}

export default function getReportList(
  { targetDir, userName, logger: loggerFromConfig }: iEporConfig,
  option: genOption
): void {
  function printReport() {
    const reportList = getReportFromMessage(userName, option);
    if (reportList.length === 0) {
      console.log("没有找到你今天产生的commit");
      return;
    }
    (loggerFromConfig || logger)(reportList);
  }

  const targetDirPaded = padTargetDir(targetDir);
  getMessageFromFile(targetDirPaded);
  setTimeout(printReport, 400);
}
