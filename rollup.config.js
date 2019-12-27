// import resolve from "rollup-plugin-node-resolve";
// import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import json from "rollup-plugin-json";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "lib/index.js",
      format: "cjs"
    },
    plugins: [
      // resolve({
      //   preferBuiltins: true,
      // }),
      // commonjs(),
      typescript(),
      json()
    ],
    external: ["chalk", "fs", "path", "update-notifier", "prompts"]
  },
  {
    input: "src/epor.template.ts",
    output: {
      file: "lib/template/epor.template.js",
      format: "cjs"
    },
    plugins: [typescript()]
  }
];
