class Dock {
  location;
  numScootersAvailable;

  constructor(numScootersAvailable) {
    if (numScootersAvailable < 0) {
      throw new Error("numScootersAvailable must be positive");
    }
    this.numScootersAvailable = numScootersAvailable;
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
