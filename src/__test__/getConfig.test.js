import getConfigAsync from "../getConfig";

test("test getConfig function", () => {
  const promise = getConfigAsync();
  expect(promise instanceof Promise).toBe(true);
});
