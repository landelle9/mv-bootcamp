class Dock {
  location;
  scootersAvailable;

  constructor(scootersAvailable) {
    if (!scootersAvailable) {
      throw new Error("All scooters occupied");
    }
    this.scootersAvailable = scootersAvailable;
  }

  dockUnavailable() {
    this.isUnavailable = true;
  }

  chargeScooter() {
    if (!this.isUnavailable) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Dock;
