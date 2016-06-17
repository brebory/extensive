// jshint esversion:6

/**
 * @module extensive
 * @desc extensive exports the {@link extensive~extend} function.
 */
const extensive = (function() {
    "use strict";

    const _      = require('lodash');
    const util   = require('util');

    const extend = function(constructor, instanceMethods, classMethods) {
        let proto = (this && this.prototype) || Object.prototype;

        constructor.prototype = _.create(proto, {
            'constructor': constructor,
            '__super__': this || Object
        });

        if (instanceMethods !== undefined) {
            _.forOwn(instanceMethods, function(implementation, name) {

                console.log(`overriding method ${name} on prototype: ${util.inspect(constructor.prototype, { depth: 1, showHidden: true, colors: true })}`);
                constructor.prototype[name] = implementation;
            });
        }

        if (_.has(this, "extend")) {
            _.forOwn(this, function(value, name) {
                if (typeof value === "function") {
                    value = value.bind(constructor);
                }

                constructor[name] = value;
            });
        } else {
            constructor.extend = extend.bind(constructor);
        }

        if (classMethods !== undefined) {
            _.forOwn(classMethods, function(implementation, name) {
                constructor[name] = implementation;
            });
        }


        return constructor;
    };

    return extend;
})();

module.exports = extensive;
