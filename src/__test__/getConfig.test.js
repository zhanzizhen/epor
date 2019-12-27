import getConfigAsync from "../getConfig";

describle("test getConfig function", () => {
  test("return a promise", () => {
    const promise = getConfigAsync();
    expect(promise instanceof Promise).toBe(true);
  });
});
