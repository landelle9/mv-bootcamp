class Scooter {
  id;
  pricepermin = 0.25;
  unlockFee = 1;
  rangeLeft;
  QRcode;
  chargePercentage = 100;
  batteryPercentage = 100;

  isBroken = false;
  /**
   * Constructs a new instance of scooter
   * @param {*} id
   */
  constructor(id) {
    if (!id) {
      throw new Error("must have an id");
    }
    this.id = id;
  }

  /*
  Mark the scooter as broken 
  
  */
  reportBroken() {
    this.isBroken = true;
  }
  /*
Charges the scooter if it is working 
  */
  charge() {
    if (!this.isBroken) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Scooter;
