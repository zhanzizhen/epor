export default `'use strict';

var eporConfig = {
    // your workspace, required
    targetDir: [ 
        "C:/Users/zhanzizhen/Desktop/avg-official-web",
        "C:/Users/zhanzizhen/Desktop/avg-manage-web",
        "C:/Users/zhanzizhen/Desktop/avg-wap"
    ],
    // your global git name, required
    userName: "zhanzizhen",
    // can be empty. Or you can define your individual logger: (commitList:string[]) => string
    logger: undefined,
};

module.exports = eporConfig;

`;
