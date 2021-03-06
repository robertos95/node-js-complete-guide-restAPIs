const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

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

describe("registerUser", () => {
  it("should throw error if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Bob");
    expect(result).toMatchObject({ username: "Bob" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if order if points is above 10", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
