export type messageItem = string;

export interface iEporConfig {
  targetDir: messageItem[];
  userName: string;
  logger?: (reportList: messageItem[]) => void;
}

const eporConfig: iEporConfig = {
  targetDir: [
    "C:/Users/zhanzizhen/Desktop/avg-official-web",
    "C:/Users/zhanzizhen/Desktop/avg-manage-web",
    "C:/Users/zhanzizhen/Desktop/avg-wap"
  ],
  userName: "zhanzizhen",
  // logger： (commitList:string[]) => string
  logger: undefined
};
export default eporConfig;
