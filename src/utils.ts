const todayBeginTime = new Date().setHours(0, 0, 0, 0) / 1000;
const ONE_DAY = 24 * 60 * 60;

export // 判断时间是否合适
function isInRange(
  timeStamp: number, // 单位是s
  time: TimeOption | number
): "valid" | "tooOld" | "tooNew" {
  let startTime: number;
  let endTime: number;
  switch (time) {
    case "-t":
    case "--today":
      startTime = todayBeginTime - 0 * ONE_DAY;
      endTime = ONE_DAY + todayBeginTime;
      break;
    case "--yesterday":
    case "-y":
      startTime = todayBeginTime - 1 * ONE_DAY;
      endTime = todayBeginTime;
      break;
    case "--week":
      startTime = todayBeginTime - 7 * ONE_DAY;
      endTime = todayBeginTime;
      break;
    default:
      startTime = time;
      endTime = time + ONE_DAY;
  }

  if (timeStamp < startTime) {
    return "tooOld";
  }
  if (timeStamp > endTime) {
    return "tooNew";
  }
  return "valid";
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
