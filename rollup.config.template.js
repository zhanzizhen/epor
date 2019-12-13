import typescript from "rollup-plugin-typescript";

export default {
  input: "src/epor.template.ts",
  output: [
    {
      file: "template/epor.template.js",
      format: "cjs"
    }
  ],
  plugins: [
    typescript(),
  ]
};
