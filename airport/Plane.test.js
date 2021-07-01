const Plane = require("./Plane");
const PlaneStatus = require("./PlaneStatus");
const Bag = require("./Bag");
const Passenger = require("./Passenger");
const Ticket = require("./Ticket");
const PlaneStatus = require("./PlaneStatus");

describe("Plane test"),
  function () {
    test("on board", function () {
      const Plane = new Plane("Boeing");
      const andelle = new Passenger("Andelle");
      const andelleTicket = new Ticket("12421");
      const andelleBags = new Bag(15);
    });

    test("plane has arrived at airport, ready for boarding", function () {
      const PlaneStatus = new PlaneStatus("Arrived");
      expect(plane.PlaneStatus).toBe("Arrived");
    });
  };
