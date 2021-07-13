const Dock = require("../Dock.js");

describe("Dock tests", function () {
  test("can set scooters available", function () {
    const dock1 = new Dock(7);
    expect(dock1.numScootersAvailable).toEqual(7);
  });
  test("errors if scooters are negative", function () {
    expect(() => new Dock(-27)).toThrowError();
  });
});
