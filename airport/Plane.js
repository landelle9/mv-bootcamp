class Plane {
  aircraft;
  origin;
  destination;
  passenger;
  status;

  constructor(aircraft, origin, destination, passenger, status) {
    this.aircraft = aircraft;
    this.origin = [];
    this.destination = [];
    this.passenger = [];
    this.status = [];
  }

  addOrigin(airport) {
    if (airport.origin) {
      this.origin = origin;
    }
  }
  addDestination(airport) {
    if (airport.destination) {
      this.destination = destination;
    }
  }
  addPassenger(passenger) {
    if (airport.passenger) {
      this.origin.push(passenger);
    }
  }
  addPlaneStatus(status) {
    if (status.plane) {
      this.status = status;
    }
  }
}
