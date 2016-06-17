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

            expect(Class).to.be.a('function');
            expect(Class).itself.to.respondTo('extend');
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
                expect(Class).itself.to.respondTo(key);
            });

            _.forEach(methodNames, function(value, index) {
                expect(Class[value]()).to.equal(returnValues[index]);
            });
        });

        it('should properly set up the prototype chain for multiple levels of subclassing', function() {
            const baseCtor      = noop;
            const subCtor       = noop;
            const sub2Ctor      = noop;
            const baseFn        = sinon.stub();
            const fooBaseRetVal = "test1";
            const fooBaseFn     = sinon.stub().returns(fooBaseRetVal);
            const subFn         = sinon.stub();
            const fooSubRetVal  = "test2";
            const fooSubFn      = sinon.stub().returns(fooSubRetVal);
            const sub2Fn        = sinon.stub();
            const sub2ClsFn     = sinon.stub();
            const fooSub2RetVal = "test3";
            const fooSub2Fn     = sinon.stub().returns(fooSub2RetVal);

            const BaseClass = extend(baseCtor, { base: baseFn, foo: fooBaseFn });
            const SubClass  = BaseClass.extend(subCtor, { sub: subFn, foo: fooSubFn });
            const SubClass2 = SubClass.extend(sub2Ctor, { sub2: sub2Fn, foo: fooSub2Fn }, { sub2Cls: sub2ClsFn });

            expect(SubClass).itself.to.respondTo("extend");
            expect(SubClass2).itself.to.respondTo("extend");

            var base = new BaseClass();
            expect(base).to.be.instanceOf(BaseClass);
            expect(base).to.respondTo("base");
            expect(base).to.respondTo("foo");
            expect(base.foo()).to.equal(fooBaseRetVal);
            expect(fooBaseFn).to.have.been.called();

            var sub = new SubClass();
            expect(sub).to.be.instanceOf(BaseClass);
            expect(sub).to.be.instanceOf(SubClass);
            expect(sub).to.respondTo("base");
            expect(sub).to.respondTo("foo");
            expect(sub).to.respondTo("sub");
            expect(sub.foo()).to.equal(fooSubRetVal);
            expect(fooSubFn).to.have.been.called();

            var sub2 = new SubClass2();
            expect(SubClass2).itself.to.respondTo("sub2Cls");
            expect(sub2).to.be.instanceOf(BaseClass);
            expect(sub2).to.be.instanceOf(SubClass);
            expect(sub2).to.be.instanceOf(SubClass2);
            expect(sub2).to.respondTo("base");
            expect(sub2).to.respondTo("foo");
            expect(sub2).to.respondTo("sub");
            expect(sub2).to.respondTo("sub2");
            expect(sub2.foo()).to.equal(fooSub2RetVal);
        });

    });

});
