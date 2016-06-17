# extensive

Tiny javascript library for extending objects Backbone-style.

## Installation

`npm install extensive`

## Usage

```javascript
const extend = require('extensive');

const Animal = extend(function(name) {
    this.name = name;
}, {
    speak: function() {
        console.log("...");
    }
}, {
    isAnimal: function(obj) {
        return obj instanceOf Animal;
    }
});

var test = new Animal("test");

test.speak();
// "...""

```

A constructor created with extensive will provide a static extend method to create subclasses.

```javascript
const Cat = Animal.extend(function(name, owner) {
    this.name = name;
    this.owner = owner;
}, {
    speak: function() {
        console.log("meowww");
    },

    showAffection: function(person) {
        if (person === this.owner) {
            console.log("purr");
        } else {
            console.log("hissss");
        }
    }
});

var felix = new Pet("felix", "brebory");

felix.speak();
// "meowww"

felix.showAffection("gina");
// "hissss"

felix.showAffection("brebory");
// "purr"

```
