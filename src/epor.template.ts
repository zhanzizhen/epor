import getUserName from "git-user-name";

const configStr = `'use strict';

var eporConfig = {
    // your workspace, required, ezample: "C:/Users/zhanzizhen/Desktop/project-name"
    targetDir: [],
    // your global git name, required
    userName: "${getUserName()}",
    // can be empty. Or you can define your individual logger: (commitList:string[]) => string
    logger: undefined,
};

module.exports = eporConfig;

`;

export default configStr;
