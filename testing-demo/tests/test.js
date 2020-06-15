const lib = require("../lib");

describe("absolute", () => {
  it("should return a + number if input is +", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a + number if input is -", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a 0 number if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Bob");
    expect(result).toMatch(/Bob/);
    // expect(result).toContain('Bob');
  });
});
