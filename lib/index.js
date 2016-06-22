// jshint esversion:6

/**
 * @module extensive
 * @desc extensive exports the {@link extensive~extend} function.
 */
const extensive = (function() {
    "use strict";

    const _      = require('lodash');

    const extend = function(constructor, instanceMethods, classMethods) {
        instanceMethods = instanceMethods || {};
        let parent = this || function() {};

        constructor.prototype = _.create(parent.prototype, instanceMethods, {
            'constructor': constructor,
            '__super__': parent
        });

        _.merge(constructor, _.omit(parent, ['constructor', '__super__']), classMethods);

        if (!_.has(parent, "extend")) {
            constructor.extend = extend;
        }

        return constructor;
    };

    return extend;
})();

module.exports = extensive;
