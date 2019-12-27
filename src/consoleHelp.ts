import packageJsonConfig from "../package.json";

const { version, description } = packageJsonConfig;

export function consoleVersion() {
  console.log(`Version: ${version}`);
}
export function consoleHelp() {
  console.log(
    `${description}
Version: ${version}

Usage:  epor [command] [options]

Commands:
  generate         generate your daily report

Options:
  -v, --version    output the version number
  -h, --help       output usage information
  -t, --today      output the daily report of today
  -y, --yesterday  output the daily report of yesterday
`
  );
}
