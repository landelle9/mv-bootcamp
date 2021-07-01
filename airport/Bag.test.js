const Bag = require('./Bag');


describe('Bag tests', function () {
    test('has a weight', function () {
        const andellesBag = new Bag(15);
        expect(andellesBag.weight).toBe(15);
    });

    test('does not have a weight', function () {
        expect(() => new Bag()).toThrowError('bag must have a weight');
    });
})