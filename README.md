# extensive [![Build Status](https://travis-ci.org/brebory/extensive.svg?branch=master)](https://travis-ci.org/brebory/extensive) [![Coverage Status](https://coveralls.io/repos/github/brebory/extensive/badge.svg?branch=master)](https://coveralls.io/github/brebory/extensive?branch=master)

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

var felix = new Cat("felix", "brebory");

felix.speak();
// "meowww"

felix.showAffection("gina");
// "hissss"

felix.showAffection("brebory");
// "purr"

Cat.isAnimal(felix);
// true

```
