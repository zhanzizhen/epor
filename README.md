# epor

## introduction

写日报对于有些人来说是件烦恼的事情，你不得不在辛勤劳作一天后，还得拼命去回忆今天做了什么。
有时我会在想，其实我今天的 git commit message 其实就是我今天的工作内容，如果有个命令能帮我整理出这些 message list 就好了。
然后 epor 就是为这而生。

epor 的特点如下：

1. 提供可模板功能，可配置自己的日报模板（自定义 logger 函数）

## Usage

全局安装 epor：

```bash
npm i epor -g
```

初次使用需要配置`epor.template.js`。

然后运行如下命令，便可以生成今日的日报：

```cmd
> epor generate
```

如果你想生成昨天的，可以这样：

```cmd
>epor generate --yesterday
```

或者简写：

```cmd
> epor gen -y
```

## future feature

1. 支持周报
2. 支持月报

## License

MIT
