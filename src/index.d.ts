export type Time = "-y" | "--yesterday" | "--today" | "-t";

export type messageItem = { message: string; timeStamp: number };

export interface iEporConfig {
  targetDir: string[];
  userName: string;
  logger?: (reportList: messageItem[]) => void;
}

export type targetDir = iEporConfig["targetDir"];
