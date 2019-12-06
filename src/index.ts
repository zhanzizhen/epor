import fs from "fs";

const targetDir: string[] = [
  "C:/Users/zhanzizhen/Desktop/avg-official-web/.git/logs/refs/heads",
  "C:/Users/zhanzizhen/Desktop/avg-manage-web/.git/logs/refs/heads",
  "C:/Users/zhanzizhen/Desktop/avg-wap/.git/logs/refs/heads"
];

const USER_NAME = "zhanzizhen";

const todayBeginTime = new Date().setHours(0, 0, 0, 0) / 1000;
function isInToday(gitTimeStamp: string) {
  return Number(gitTimeStamp) >= todayBeginTime;
}

const logText: string[] = [];
targetDir.forEach(dir => {
  fs.readdir(dir, (err, data) => {
    if (Array.isArray(data)) {
      data.forEach(fileName => {
        fs.readFile(`${dir}/${fileName}`, (err, data) => {
          if (!data) {
            throw new Error();
          }
          logText.push(data.toString("utf-8"));
        });
      });
    }
  });
});

function addMessage(commitList: string[], text: string) {
  const commitMessage = text.match(/(?<=commit:\s).+/);
  if (commitMessage !== null && commitMessage.length !== 1) {
    throw new Error("数据有误");
  }
  if (commitMessage) {
    commitList.push(commitMessage[0]);
  }
}

function getReportFromMessage(): string[] {
  const reportCommitList: string[] = [];
  logText.forEach(branchLogText => {
    const branchLogList = branchLogText.split("\n");
    for (let i = branchLogList.length - 1; i >= 0; i--) {
      const singleLog = branchLogList[i];
      // fing logs created by the user
      const isBelongsToUser = new RegExp(`[a-z1-9]+ ${USER_NAME} `).test(
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

function logger(list: string[]) {
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}. ${list[i]}\n`);
  }
}

setTimeout(() => logger(getReportFromMessage()), 400);
