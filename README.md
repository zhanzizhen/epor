# epor

a npm package for being easy to write daily report

## introduction

写日报对于有些人来说是件烦恼的事情，你不得不在辛勤劳作一天后，还得拼命去回忆今天做了什么。
有时我会在想，其实我今天的 git commit message 其实就是我今天的工作内容，如果有个命令能帮我整理出这些 message list 就好了。
然后 epor 就是为这而生。

epor 的特点如下：

1. 提供模板功能，可配置自己的日报模板（logger 函数）
2. 待补充

## Usage

全局安装 epor：

```bash
npm i epor -g
```

初次使用需要配置`epor.template.js`的抓取目录，配置文件的位置在命令行会有提示。

然后运行如下命令，便可以选择生成日报：

```cmd
> epor
```

## feature

1. 抓取今日的 commit message 生成今日份的日报
2. 抓取昨日的 commit message 生成昨日份的日报

## roadmap

1. 支持周报
2. 支持月报
3. 存储日报到本地，并可以生成数据分析

## License

MIT
