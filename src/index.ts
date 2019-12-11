import fs from "fs";

type messageItem = string;

interface argType {
  targetDir: messageItem[];
  userName: string;
}

const todayBeginTime = new Date().setHours(0, 0, 0, 0) / 1000;
const logText: messageItem[] = [];

// 判断是否是今天的时间
function isInToday(gitTimeStamp: string): boolean {
  return Number(gitTimeStamp) >= todayBeginTime;
}

// 从.git文件夹读取message
function getMessageFromFile(targetDir: argType["targetDir"]) {
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
    throw new Error("数据有误");
  }
  if (commitMessage) {
    commitList.push(commitMessage[0]);
  }
}

function getReportFromMessage(userName: string): messageItem[] {
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
        if (!isInToday((timeStamp as RegExpMatchArray)[0])) {
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

export default function getReportList({ targetDir, userName }: argType): void {
  getMessageFromFile(targetDir);
  setTimeout(() => logger(getReportFromMessage(userName)), 400);
}
