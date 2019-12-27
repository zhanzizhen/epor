export type genOption = "-y" | "--yesterday" | "--today" | "-t";

export type messageItem = string;

export interface iEporConfig {
  targetDir: messageItem[];
  userName: string;
  logger?: (reportList: messageItem[]) => void;
}

export type targetDir = iEporConfig["targetDir"];
