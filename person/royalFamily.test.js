const people = require('./royalFamily') // Imports file

describe('Family tree test suite', () => { // test suite

    test('Queen Elizabeth II mother', () => { // single test
        expect(people.queenElizabeth.name).toEqual("Queen Elizabeth")
    })
    test('Queen Elizabeth II father', () => { // single test
        expect(people.George.name).toEqual("King George VI")
    })
    test('Countess of Snowdens mother', () => { // single test
        expect(people.queenElizabeth.name).toEqual("Queen Elizabeth")
    })
    test('Prince Phillips mother', () => { // single test
        expect(people.alice.name).toEqual("Princess Alice of Battenberg")
    })
})
