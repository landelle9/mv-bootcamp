const Scooter = require("../Scooter.js");

describe("Scooter tests", function () {
  test("has an id", function () {
    const scooter = new Scooter("0001");
    expect(scooter.id).toBe("0001");
  });
  test("charge working scooter", function () {
    const scooter = new Scooter("0001");
    expect(scooter.charge).toBeTruthy();
  });
  test("charge broken scooter", function () {
    const scooter = new Scooter("0001");
    scooter.reportBroken();
    expect(scooter.charge()).toBeFalsy();
  });
});
