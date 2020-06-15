const lib = require("../exercise1");
describe("fizzBuzz", () => {
  it("should throw exception for falsy input", () => {
    const args = [null, undefined, "a", false, ({})];
    args.forEach((a) => {
      expect(() => {
        lib.fizzBuzz(a);
      }).toThrow();
    });
  });

  it("should return Fizzbuz if divisible by 15", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz if divisible by 3, but not divisible by 5", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz if divisible by 5, but not divisible by 5", () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return the number if the number is not divisible by 3 or 5", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
