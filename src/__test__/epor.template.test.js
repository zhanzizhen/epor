import config from "../epor.template";

test("config structure", () => {
  console.log(config);
  expect(typeof config).toBe("object");
  expect(Array.isArray(config.targetDir)).toBe(true);
  expect(typeof config.userName).toBe("string");
});
