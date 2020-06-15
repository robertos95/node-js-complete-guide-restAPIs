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

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();
    // PROPER WAY
    // expect(result).toContain("USD");
    // expect(result).toContain("AUD");
    // expect(result).toContain("EUR");

    // IDEAL WAY
    expect(result).toEqual(expect.arrayContaining(["USD", "EUR", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given ID", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 }); // result must match and has exactly 2 properties only
    expect(result).toMatchObject({ id: 1, price: 10 }); // result must match but can have more than these 2 properties
    // expect(result).toHaveProperty('id', 1); // another option to test property
});
});
