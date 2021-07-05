const Dock = require("../Dock.js");

describe("Dock tests", function () {
  test("has scooters available", function () {
    const scooter = new Dock("Dock Available");
    expect(scooter.scootersAvailable).toBeFalsy();
  });
});
