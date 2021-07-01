class Passenger {
    name;
    bags;
    ticket;

    constructor(name)
    {
        this.name = name;
        this.bags = [];
        this.ticket = []
    }

    addBag(bag){
        this.bags.push(bag)
    }

    addTicket(ticket){
        this.ticket = ticket
    }
}

module.exports = Passenger 