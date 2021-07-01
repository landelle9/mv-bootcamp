class Bag { 
    height;
    weight;


constructor (weight) {
    if(!weight) {
        throw new Error ('bag must have a weight');
    }
    this.weight=weight;
}
}



module.exports = Bag