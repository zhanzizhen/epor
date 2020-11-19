type TimeOption = "-y" | "--yesterday" | "--today" | "-t" | "--week";

type messageItem = { message: string; timeStamp: number };

interface iEporConfig {
  targetDir: string[];
  userName: string;
  logger?: (reportList: messageItem[]) => void;
}

type targetDir = iEporConfig["targetDir"];
