import { Time, messageItem, targetDir } from "./index.d";

export // 判断时间是否合适
function isInRange(
  timeStamp: number,
  time: Time
): {
  isValid: boolean;
  isOld: boolean;
} {
  const todayBeginTime = new Date().setHours(0, 0, 0, 0) / 1000;
  const yesterDayBeginTime = todayBeginTime - 24 * 60 * 60;
  let isValid: boolean = false;
  let isOld: boolean = false;
  switch (time) {
    case "-t":
    case "--today":
      if (timeStamp >= todayBeginTime) {
        isValid = true;
        isOld = false;
      } else {
        isValid = false;
        isOld = true;
      }
      break;
    case "--yesterday":
    case "-y":
      if (timeStamp < yesterDayBeginTime) {
        isValid = false;
        isOld = true;
      } else if (timeStamp < todayBeginTime) {
        isValid = true;
        isOld = false;
      }
      break;
  }
  return {
    isOld,
    isValid,
  };
}

export function initialLogger(list: messageItem[]) {
  list.sort((a, b) => a.timeStamp - b.timeStamp);
  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}. ${list[i].message}\n`);
  }
}

export function padTargetDir(params: targetDir): string[] {
  return params.map((url) => `${url}/.git/logs/refs/heads`);
}
