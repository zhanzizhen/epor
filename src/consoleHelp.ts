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

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  generate          generate your daily report
`
  );
}
export function consoleInitHelp() {
  console.log(
    `Usage:  cool-cli init [options]

Options:
  -v, --version      output the version number`
  );
}
export function consoleStartHelp() {
  console.log(
    `Usage:  cool-cli start [options]

Options:
  -V, --version         output the version number
  -h, --help            output usage information
`
  );
}
