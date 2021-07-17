// Arrow functions
const square = function(x) {
    return x * x;
}

const square2 = (x) => {
    return x * x;
}

const square3 = (x) => x * x;

console.log('===== Arrow functions =====');
console.log(square(3));
console.log(square2(3));
console.log(square3(3));
console.log('===== Arrow functions =====');
console.log('');

// Functions as methods
const event = {
    name: 'Birthday party',
    printGuestList: function() {
        console.log('Guest list for ' + this.name);
    }
}

console.log('===== Functions as methods =====');
event.printGuestList();

const event2 = {
    name: 'Birthday party',
    printGuestList: () => {
        console.log('Guest list for ' + this.name);
    }
}

event2.printGuestList();

const event3 = {
    name: 'Birthday party',
    printGuestList() {
        console.log('Guest list for ' + this.name);
    }
}

event3.printGuestList();
console.log('===== Functions as methods =====');
console.log('');

// Arrow function biding
const event4 = {
    name: 'Birthday party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name);
        this.guestList.forEach(function(guest) {
            console.log(guest + ' is attending ' + this.name);
        });
    }
}

console.log('===== Arrow function biding =====');
event4.printGuestList();

const event5 = {
    name: 'Birthday party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList() {
        console.log('Guest list for ' + this.name);
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name);
        })
    }
}

event5.printGuestList();
console.log('===== Arrow function biding =====');

