import packageJsonConfig from "../package.json";

const { version, description } = packageJsonConfig;

export function consoleVersion() {
  console.log(`Version: ${version}`);
}
export function consoleHelp() {
  console.log(
    `Usage:  epor [command] [options]

${description}
Version: ${version}

Commands:
  generate         generate your daily report

Options:
  -v, --version    output the version number
  -h, --help       output usage information
  -y, --yesterday  output the daily report of yesterday
`
  );
}
