const queenElizabeth = {
    name: 'Queen Elizabeth',
    parents: [],
    childOf: []
};

const George = {
    name: 'King George VI',
    parents: [],
    childOf: []
};

const queenE = {
    name: 'Queen Elizabeth II',
    parents: [George, queenElizabeth],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      }
}

// Queen Elizabeth II sister = Princess Margaret 

const countess = {
    name: 'Princess Margaret',
    parents: [queenElizabeth,George],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

// Queen Elizabeth II Husband = princePhillip
// Prince Phillips parents = Alice & Andrew 

const alice = {
    name: 'Princess Alice of Battenberg',
    parents: [],
}

const andrew = {
    name: 'Prince Andrew of Greece and Denmark',
    parents: [],
}

const princePhillip = {
    name: 'Duke of Edinburgh',
    parents: [alice, andrew],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

// Prince Phillip and Queen Elizabeth II are the parents of charles 

const charles = {
    name: 'Prince of Wales',
    parents: [princePhillip, queenE],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

// Prince Charles late wife is Camila 

const duchess = {
    name: 'Camila',
    parents: [],
}

// Princess Diana is the ex wife of Prince Charles before her death

const diana = {
    name: 'Princess of Wales',
    parents: [],
}

// Princess Diana is the mother of Prince William and Prince Harry 
// William and Catherine are the parents of Prince George and princess Charlotte 

const william = {
    name: 'Duke of Cambridge',
    parents: [diana,charles],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

const catherine = {
    name: 'Duchess of Cambridge',
    parents: [],
    spouse: [william],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

const princeGeorge = {
    name: 'Prince George',
    parents: [william, catherine],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

const princessCharlotte = {
    name: 'Princess Charlotte',
    parents: [william, catherine],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

// Prince Harry is the brother of Prince William 

const princeHarry = {
    name: 'Duke of Sussex',
    parents: [diana, charles],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

const Meghan = {
    name: 'Duchess of Sussex',
    parents: [],
}

const archie = {
    name: 'Archie Harrison Mountbatten - Windsor',
    parents: [princeHarry, Meghan],
    childOf: function () {
        return this.parents.map(parent => parent.name).join(' & ') || "unknown"
      },
}

module.exports ={queenElizabeth,George,queenE, countess,alice, andrew, princePhillip, charles, duchess, diana, william, catherine, princeGeorge, princessCharlotte, princeHarry, Meghan, archie}