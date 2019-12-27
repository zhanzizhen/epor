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
    // you can define your individual logger, it's type is (commitList:string[]) => string
    logger: undefined
};

module.exports = eporConfig;

`;
