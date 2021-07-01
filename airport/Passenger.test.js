const Bag = require("./bag");
const Passenger = require("./Passenger");
const Ticket = require("./Ticket");

describe('Passenger', function () {
    test('has name', function () {
        const andelle = new Passenger('Andelle');
        expect(andelle.name).toBe('Andelle');
    });

    test('has bags', function () {
        const andelleBags = new Bag(15);
        const andelle = new Passenger('Andelle')
        andelle.addBag(andelleBags)
        expect(andelle.bags).toHaveLength(1);
       
    });
    test('has ticket', function () {
        const andelleTicket = new Ticket('12421'); // Object 
        const andelle = new Passenger('Andelle')
        andelle.addTicket(andelleTicket) // Added ticket to Passenger
        console.log(andelle.ticket);
        expect(andelle.ticket.ticketid).toBe('12421');
    })
})