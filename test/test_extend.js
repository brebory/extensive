// jshint esversion: 6

const chai      = require('chai'),
      dirtyChai = require('dirty-chai'),
      sinon     = require('sinon'),
      sinonChai = require('sinon-chai'),
      _         = require('lodash'),
      use       = require('rekuire'),
      expect    = chai.expect;

chai.use(dirtyChai);
chai.use(sinonChai);

const extend = use('index');
const noop   = function() {};

describe('extensive', function() {

    it('should export the extend function', function() {
        expect(extend).to.be.a('function');
    });

    describe('~extend', function() {

        it('should return a constructor with a static extend method', function() {
            const Class = extend(noop);

            expect(Class).to.respondTo('extend');
            expect(Class.extend).to.be.a('function');
        });

        it('should create instances of the class', function() {
            const ctor  = sinon.stub();
            const Class = extend(ctor);

            var instance = new Class();

            expect(instance).to.be.instanceof(Class);
            expect(ctor).to.have.been.called();
        });

        it('should add instance methods to the prototype chain', function() {
            const methodNames = ['one', 'two', 'three'];
            const returnValues = ['test1', 'test2', 'test3'];
            const instanceMethods = {};

            _.forEach(methodNames, function(value, index) {
                instanceMethods[methodNames[index]] = sinon.stub().returns(returnValues[index]);
            });

            const Class = extend(noop, instanceMethods);

            var instance = new Class();

            _.forEach(instanceMethods, function(value, key) {
                expect(instance).to.respondTo(key);
            });

            _.forEach(methodNames, function(value, index) {
                expect(instance[value]()).to.equal(returnValues[index]);
            });

        });

        it('should add class methods on the constructor statically', function() {
            const methodNames = ['one', 'two', 'three'];
            const returnValues = ['test1', 'test2', 'test3'];
            const classMethods = {};

            _.forEach(methodNames, function(value, index) {
                classMethods[methodNames[index]] = sinon.stub().returns(returnValues[index]);
            });

            const Class = extend(noop, {}, classMethods);

            _.forEach(classMethods, function(value, key) {
                expect(Class).to.respondTo(key);
            });

            _.forEach(methodNames, function(value, index) {
                expect(Class[value]()).to.equal(returnValues[index]);
            });
        });

    });

});
