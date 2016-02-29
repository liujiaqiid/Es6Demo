/**
 * "Chai" 断言库简介
 *  包括3中不同风格的断言写法：
 *  1. assert  参考 http://chaijs.com/api/assert/
 *  2. should  参考 http://chaijs.com/api/bdd/
 *  3. expect  参考 http://chaijs.com/api/bdd/
 *
 *  链接关键字 (to,be,been,is,that,which,and,has,have,with,at,of,same) 无实际动作，
 *  只是便于语法上写出语义明确的断言语句；
 *  （可以对链接字进行复写,赋予实际功能）
 *
 *  建议在一个测试模块中使用同一种断言风格;
 *  建议尽量使用 "Chai.expect", should在有些涉及到原型的断言上不可用; assert的库语法糖单一;
 **/


var assert = require('chai').assert
  , expect = require('chai').expect
  , should = require('chai').should(); //actually call the function,The should interface extends Object.prototype
// chai configs
// chai.config.includeStack = true; // turn on stack trace
// chai.config.showDiff = false; // turn off reporter diff display
// chai.config.truncateThreshold = 0; // disable truncating

describe('Test Chai Libs', function () {

  /**
   * 1. chai.assert
   *    assert非常类似于node原生的断言模块，进行了语法糖的扩展
   *    不支持链式写法
   *    如果对一个case有多个断言判断，建议加入具体描述 message
   */
  describe('1. Assert style', function () {

    it('Api: assert(expression, message)', function () {
      assert('foo' !== 'bar', 'foo is not bar');
      assert(Array.isArray([]), 'empty arrays are arrays');
    });

    it('Api: assert.ok(object, [message])', function () {
      assert.ok('everything', 'everything is ok');
      assert.ok(true, 'everything is ok');
      //assert.ok(false, 'this will fail');

      //assert.ok('everything', 'this will fail');
      assert.notOk(true === false, 'this will pass');
      assert.notOk(false, 'this will pass');
    });

    it('Api: assert.equal(actual, expected, [message])', function () {
      assert.equal(3, '3', 'Non-strict equality (==) coerces values to strings');
      assert.notEqual(3, 4, 'these numbers are not equal');
    });

    it('Api: assert.strictEqual(actual, expected, [message])', function () {
      assert.strictEqual(true, true, 'these booleans are strictly equal');
      //assert.strictEqual(NaN, NaN, 'not pass');

      //assert.strictEqual(true, true, 'these booleans are strictly equal');
      assert.notStrictEqual(3, '3', '!== no coercion for strict equality');
      assert.notStrictEqual(NaN, NaN, 'will pass');
    });

    it('Api: assert.deepEqual(actual, expected, [message])', function () {
      assert.deepEqual({tea: 'green'}, {tea: 'green'}, "it's ok");
      assert.notDeepEqual({tea: 'green'}, {tea: 'jasmine'}, "it's ok");
    });

    it('Api: assert.isTrue(value, [message])', function () {
      var teaServed = true;
      assert.isTrue(teaServed, 'the tea has been served');
    });

    it('Api: assert.isAbove(valueToCheck, valueToBeAbove, [message])', function () {
      assert.isAbove(5, 2, '5 is strictly greater than 2');
    });

    it('Api: assert.isBelow(valueToCheck, valueToBeBelow, [message])', function () {
      assert.isBelow(3, 6, '3 is strictly less than 6');
    });

    it('Api: assert.isFalse(value, [message])', function () {
      var teaServed = false;
      assert.isFalse(teaServed, 'no tea yet? hmm...');
    });

    it('Api: assert.isNull(value, [message])', function () {
      assert.isNull(null, 'there was no error');
      var tea = 'tasty chai';
      assert.isNotNull(tea, 'great, time for tea!');
    });

    it('Api: assert.isDefined(value, [message])', function () {
      var tea;
      assert.isUndefined(tea, 'no tea defined');
      tea = 'cup of chai';
      assert.isDefined(tea, 'tea has been defined');
    });

    it('Api: assert.isFunction(value, [message])', function () {
      function serveTea() {
        return 'cup of tea';
      };
      assert.isFunction(serveTea, 'great, we can have tea now');
      serveTea = ['heat', 'pour', 'sip'];
      assert.isNotFunction(serveTea, 'great, we have listed the steps');
    });

    it('Api: assert.isObject(value, [message])', function () {
      var selection = {name: 'Chai', serve: 'with spices'};
      assert.isObject(selection, 'tea selection is an object');
      selection = 'chai';
      assert.isNotObject(selection, 'tea selection is not an object');
      assert.isNotObject(null, 'null is not an object');
    });

    it('Api: assert.isArray(value, [message])', function () {
      var menu = ['green', 'chai', 'oolong'];
      assert.isArray(menu, 'what kind of tea do we want?');
      menu = 'green|chai|oolong';
      assert.isNotArray(menu, 'what kind of tea do we want?');
    });

    it('Api: assert.isString(value, [message])', function () {
      var teaOrder = 'chai';
      assert.isString(teaOrder, 'order placed');
      teaOrder = 4;
      assert.isNotString(teaOrder, 'order placed');
    });

    it('Api: assert.isNumber(value, [message])', function () {
      var cups = 2;
      assert.isNumber(cups, 'how many cups');
      cups = '2 cups please';
      assert.isNotNumber(cups, 'how many cups');
    });

    it('Api: assert.isBoolean(value, [message]))', function () {
      var teaReady = true
        , teaServed = false;
      assert.isBoolean(teaReady, 'is the tea ready');
      assert.isBoolean(teaServed, 'has tea been served');

      teaReady = 'yep';
      teaServed = 'nope';
      assert.isNotBoolean(teaReady, 'is the tea ready');
      assert.isNotBoolean(teaServed, 'has tea been served');
    });

    it('Api: assert.typeOf(value, name, [message])', function () {

      assert.typeOf({tea: 'chai'}, 'object', 'we have an object');
      assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
      assert.typeOf('tea', 'string', 'we have a string');
      assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
      assert.typeOf(null, 'null', 'we have a null');
      assert.typeOf(undefined, 'undefined', 'we have an undefined');

      assert.notTypeOf('tea', 'number', 'strings are not numbers');
    });

    it('Api: assert.instanceOf(object, constructor, [message])', function () {
      var Tea = function (name) {
          this.name = name;
        }
        , chai = new Tea('chai');

      assert.instanceOf(chai, Tea, 'chai is an instance of tea');

      Tea = function (name) {
        this.name = name;
      };
      chai = 'chai';

      assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
    });

    it('Api: assert.include(haystack, needle, [message])', function () {
      assert.include('foobar', 'bar', 'foobar contains string "bar"');
      assert.include([1, 2, 3], 3, 'array contains value');

      assert.notInclude([1, 2, 3], 5, 'array contains value');
    });

    it('Api: assert.match(value, regexp, [message])', function () {
      assert.match('foobar', /^foo/, 'regexp matches');
      assert.notMatch('foubar', /^foo/, 'regexp does not match');
    });

    it('Api: assert.property(object, property, [message])', function () {
      assert.property({tea: {green: 'matcha'}}, 'tea');
      assert.notProperty({tea: {green: 'matcha'}}, 'coffee');
    });

    it('Api: assert.deepProperty(object, property, [message])', function () {
      assert.deepProperty({tea: {green: 'matcha'}}, 'tea.green');
      assert.notDeepProperty({tea: {green: 'matcha'}}, 'tea.oolong');
    });

    it('Api: assert.propertyVal(object, property, value, [message])', function () {
      assert.propertyVal({tea: 'is good'}, 'tea', 'is good');
      assert.propertyNotVal({tea: 'is good'}, 'tea', 'is bad');
      assert.deepPropertyVal({tea: {green: 'matcha'}}, 'tea.green', 'matcha');
      assert.deepPropertyNotVal({tea: {green: 'matcha'}}, 'tea.green', 'konacha');
    });

    it('Api: assert.lengthOf(object, length, [message])', function () {
      assert.lengthOf([1, 2, 3], 3, 'array has length of 3');
      assert.lengthOf('foobar', 6, 'string has length of 6');
    });

    it('Api: assert.throws(function, [constructor/string/regexp], [string/regexp], [message])', function () {
      var fn = function () {
      };
      assert.doesNotThrow(fn, Error, 'function does not throw');
      fn = function () {
        throw new Error('function throws a reference error')
      };
      assert.throw(fn, 'function throws a reference error');
      assert.throw(fn, /function throws a reference error/);
      fn = function () {
        throw new ReferenceError()
      };
      assert.throw(fn, ReferenceError);
      fn = function () {
        throw new ReferenceError('function throws a reference error')
      };
      assert.throw(fn, ReferenceError, 'function throws a reference error');
      assert.throw(fn, ReferenceError, /function throws a reference error/);
    });

    it('Api: assert.operator(val1, operator, val2, [message])', function () {
      assert.operator(1, '<', 2, 'everything is ok');
      //assert.operator(1, '>', 2, 'this will fail');//fail
    });

    it('Api: assert.closeTo(actual, expected, delta, [message])', function () {
      assert.closeTo(1.5, 1, 0.5, 'numbers are close');
    });

    it('Api: assert.sameMembers(set1, set2, [message])', function () {
      assert.sameMembers([1, 2, 3], [2, 1, 3], 'same members');
      assert.sameDeepMembers([{b: 3}, {a: 2}, {c: 5}], [{c: 5}, {b: 3}, {a: 2}], 'same deep members');
      assert.includeMembers([1, 2, 3], [2, 1], 'include members');
    });

    it('Api: assert.changes(function, object, property)', function () {
      var obj = {val: 10, ue: 1};
      var fn = function () {
        obj.val = 22
      };
      // Asserts that a function changes the value of a property
      assert.changes(fn, obj, 'val');
      assert.doesNotChange(fn, obj, 'ue');
    });

    it('Api: assert.increases(function, object, property)', function () {
      var obj = {val: 10, ue: 1, va: 2};
      var fn = function () {
        obj.val = 13;
        obj.va = 1;
      };
      assert.increases(fn, obj, 'val');
      obj = {val: 10, ue: 1, va: 2};
      assert.doesNotIncrease(fn, obj, 'ue');
      obj = {val: 10, ue: 1, va: 2};
      assert.decreases(fn, obj, 'va');
      obj = {val: 10, ue: 1, va: 2};
      assert.doesNotDecrease(fn, obj, 'ue');
    });

  });
  /**
   * 2. chai.should & chai.expect
   *    都属于BDD（行为驱动开发）风格
   *    都支持链式语法结构,链接字没有实际功能，仅增加可读性
   *    (to,be,been,is,that,which,and,has,have,with,at,of,same)
   *    should和expect仅初始化时不一样
   */
  describe('2. BDD style', function () {

    it('API: not', function () {
      var foo, goodFn = function () {
      };
      // expect
      expect(foo).to.not.equal('bar');
      expect(goodFn).to.not.throw(Error);
      expect({foo: 'baz'})
        .to.have.property('foo')
        .and.not.equal('bar');
      // should
      foo = '';
      var obj = {foo: 'baz'};
      foo.should.not.equal('bar');
      goodFn.should.not.throw(Error);
      obj.should
        .have.property('foo')
        .and.not.equal('bar');
    });

    it('API: deep', function () {
      // expect
      var foo = {bar: 'baz'};
      expect(foo).to.deep.equal({bar: 'baz'});
      expect({foo: {bar: {baz: 'quux'}}})
        .to.have.deep.property('foo.bar.baz', 'quux');

      // should
      foo.should.deep.equal({bar: 'baz'});
      var obj = {foo: {bar: {baz: 'quux'}}};
      obj.should.have.deep.property('foo.bar.baz', 'quux');
      obj.should.have.deep.property('foo.bar.baz').and.equal('quux');
    });

    it('API: any', function () {
      // expect
      var foo = {bar: 'baz'};
      expect(foo).to.have.any.keys('bar', 'baz');

      // should
      foo.should.have.any.keys('bar', 'baz');
    });

    it('API: all', function () {
      // expect
      var foo = {bar: 'baz', baz: 1};
      expect(foo).to.have.all.keys('bar', 'baz');

      // should
      foo.should.have.all.keys('bar', 'baz');
    });

    it('API: a / an', function () {
      // The a and an assertions are aliases that can be used
      // either as language chains or to assert a value's type.
      var Foo = function () {
      };
      var foo = new Foo;
      // expect
      // 1. can be used as typeof
      expect('test').to.be.a('string');
      expect({foo: 'bar'}).to.be.an('object');
      expect(null).to.be.a('null');
      expect(undefined).to.be.an('undefined');
      // 2. can be used as language chain
      expect(foo).to.be.an.instanceof(Foo);
      expect(foo).to.be.a.instanceof(Foo);


      // should
      // 1. can be used as typeof
      ('test').should.be.a('string');
      ({foo: 'bar'}).should.be.an('object');
      //null.should.be.a('null');  // can not use
      //undefined.should.be.an('undefined'); // can not use
      // 2. can be used as language chain
      foo.should.be.an.instanceof(Foo);
      foo.should.be.a.instanceof(Foo);
    });

    it('API: include / contain', function () {
      // include 和 contain 即可以用作断言，也可以用作链接
      // expect
      var foo = {foo: 'bar', hello: 'universe'};
      expect([1, 2, 3]).to.include(2);
      expect('foobar').to.contain('foo');
      expect(foo).to.include.keys('foo');

      // should
      ([1, 2, 3]).should.include(2);
      'foobar'.should.contain('foo');
      foo.should.include.keys('foo');
    });

    it('API: ok', function () {
      // expect
      expect('everthing').to.be.ok;
      expect(1).to.be.ok;
      expect(false).to.not.be.ok;
      expect(undefined).to.not.be.ok;
      expect(null).to.not.be.ok;

      // should
      'everthing'.should.be.ok;
      (1).should.be.ok;
      false.should.not.be.ok;
      //undefined.should.not.be.ok; // can not use
      // null.should.not.be.ok; // can not use
    });

    it('API: true / false', function () {
      // expect
      expect(true).to.be.true;
      expect(1).to.not.be.true;
      expect(false).to.be.false;
      expect(0).to.not.be.false;

      // should
      true.should.be.true;
      (1).should.not.be.true;
      false.should.be.false;
      (0).should.not.be.false;
    });


    it('API: null', function () {
      // expect
      expect(null).to.be.null;
      expect(undefined).not.to.be.null;

      // should
      //(null).should.to.be.null; // can not use
      //(undefined).should.not.be.null; // can not use
    });


    it('API: undefined', function () {
      // expect
      expect(undefined).to.be.undefined;
      expect(null).to.not.be.undefined;
      // should
    });


    it('API: exist', function () {
      // expect
      var foo = 'hi'
        , bar = null
        , baz;
      expect(foo).to.exist;
      expect(bar).to.not.exist;
      expect(baz).to.not.exist;
      // should
      foo.should.exist;
      should.not.exist(bar);
      //bar.should.not.exist;//can not use
      should.not.exist(baz);
      //baz.should.not.exist;//can not use
    });

    it('API: empty', function () {
      // expect
      expect([]).to.be.empty;
      expect('').to.be.empty;
      expect({}).to.be.empty;

      // should
      [].should.be.empty;
      ''.should.be.empty;
      ({}).should.be.empty;
    });

    it('API: arguments', function () {
      // expect
      function test1() {// 是否参数对象
        expect(arguments).to.be.arguments;
      }

      test1();
      // should
      function test2() {// 是否参数对象
        arguments.should.be.arguments;
      }

      test2();
    });

    it('API: equal  deep.equal  eql', function () {
      // expect
      expect('hello').to.equal('hello');
      expect(42).to.equal(42);
      expect(1).to.not.equal(true);
      expect({foo: 'bar'}).to.not.equal({foo: 'bar'});
      expect({foo: 'bar'}).to.deep.equal({foo: 'bar'});
      expect({foo: 'bar'}).to.eql({foo: 'bar'});// deeply equal
      expect([1, 2, 3]).to.eql([1, 2, 3]);// deeply equal

      // should
      'hello'.should.equal('hello');
      (42).should.equal(42);
      (1).should.not.equal(true);
      ({foo: 'bar'}).should.not.equal({foo: 'bar'});
      ({foo: 'bar'}).should.deep.equal({foo: 'bar'});
      ({foo: 'bar'}).should.eql({foo: 'bar'});// deeply equal
      ([1, 2, 3]).should.eql([1, 2, 3]);// deeply equal
    });

    it('API: above / below', function () {
      // expect
      expect(10).to.be.above(5);
      expect('foo').to.have.length.above(2);
      expect([1, 2, 3]).to.have.length.above(2);

      // should
      (10).should.be.above(5);
      ('foo').should.have.length.above(2);
      ([1, 2, 3]).should.have.length.above(2);

      // expect
      expect(5).to.be.below(10);
      expect('foo').to.have.length.below(4);
      expect([1, 2, 3]).to.have.length.below(4);

      // should
      (5).should.be.below(10);
      'foo'.should.have.length.below(4);
      ([1, 2, 3]).should.have.length.below(4);
    });

    it('API: least / most ', function () {
      // expect
      expect(10).to.be.at.least(10);
      expect('foo').to.have.length.of.at.least(2);
      expect([1, 2, 3]).to.have.length.of.at.least(3);
      expect(5).to.be.at.most(5);
      expect('foo').to.have.length.of.at.most(4);
      expect([1, 2, 3]).to.have.length.of.at.most(3);

      // should
      (10).should.be.at.least(10);
      'foo'.should.have.length.of.at.least(2);
      [1, 2, 3].should.have.length.of.at.least(3);
      (5).should.be.at.most(5);
      'foo'.should.have.length.of.at.most(4);
      [1, 2, 3].should.have.length.of.at.most(3);
    });

    it('API: within', function () {
      // expect
      expect(7).to.be.within(5, 10);
      expect('foo').to.have.length.within(2, 4);
      expect([1, 2, 3]).to.have.length.within(2, 3);
      expect([1, 2, 3]).length.within(2, 3);

      // should
      (7).should.be.within(5, 10);
      'foo'.should.have.length.within(2, 4);
      [1, 2, 3].should.have.length.within(2, 4);
    });

    it('API: instanceof', function () {
      // expect
      var Tea = function (name) {
          this.name = name;
        }
        , Chai = new Tea('chai');

      expect(Chai).to.be.an.instanceof(Tea);
      expect([1, 2, 3]).to.be.instanceof(Array);

      // should
      Chai.should.be.an.instanceof(Tea);
      [1, 2, 3].should.be.instanceof(Array);
    });

    it('API: property', function () {
      // expect
      // simple referencing
      var obj = {foo: 'bar'};
      expect(obj).to.have.property('foo');
      expect(obj).to.have.property('foo', 'bar');
      // deep referencing
      var deepObj = {
        green: {tea: 'matcha'},
        teas: ['chai', 'matcha', {tea: 'konacha'}]
      };
      expect(deepObj).to.have.deep.property('green.tea', 'matcha');
      expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
      expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
      // deep array
      var arr = [
        ['chai', 'matcha', 'konacha']
        , [{tea: 'chai'}
          , {tea: 'matcha'}
          , {tea: 'konacha'}]
      ];
      expect(arr).to.have.deep.property('[0][1]', 'matcha');
      expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
      // 注意: property 会更改断言中的主语,并支持后续的断言链
      expect(obj).to.have.property('foo')
        .that.is.a('string');
      expect(deepObj).to.have.property('green')
        .that.is.an('object')
        .that.deep.equals({tea: 'matcha'});
      expect(deepObj).to.have.property('teas')
        .that.is.an('array')
        .with.deep.property('[2]')
        .that.deep.equals({tea: 'konacha'});

      // should
      // simple referencing
      obj.should.have.property('foo');
      obj.should.have.property('foo', 'bar');
      // deep referencing
      deepObj.should.have.deep.property('green.tea', 'matcha');
      deepObj.should.have.deep.property('teas[1]', 'matcha');
      deepObj.should.have.deep.property('teas[2].tea', 'konacha');
      // deep array
      arr.should.have.deep.property('[0][1]', 'matcha');
      arr.should.have.deep.property('[1][2].tea', 'konacha');
      //
      obj.should.have.property('foo')
        .that.is.a('string');
      deepObj.should.have.property('green')
        .that.is.an('object')
        .that.deep.equals({tea: 'matcha'});
      deepObj.should.have.property('teas')
        .that.is.an('array')
        .with.deep.property('[2]')
        .that.deep.equals({tea: 'konacha'});
    });

    it('API: ownProperty', function () {
      // expect
      expect('test').to.have.ownProperty('length');

      // should
      'test'.should.have.ownProperty('length');
    });

    it('API: length', function () {
      // expect
      expect([1, 2, 3]).to.have.length(3);
      expect('foobar').to.have.length(6);
      expect('foo').to.have.length.above(2);
      expect([1, 2, 3]).to.have.length.above(2);
      expect('foo').to.have.length.below(4);
      expect([1, 2, 3]).to.have.length.below(4);
      expect('foo').to.have.length.within(2, 4);
      expect([1, 2, 3]).to.have.length.within(2, 4);

      // should
      [1, 2, 3].should.have.length(3);
      'foobar'.should.have.length(6);
      'foo'.should.have.length.above(2);
      [1, 2, 3].should.have.length.above(2);
      'foo'.should.have.length.below(4);
      [1, 2, 3].should.have.length.below(4);
      'foo'.should.have.length.within(2, 4);
      [1, 2, 3].should.have.length.within(2, 4);
    });

    it('API: match / string', function () {
      // expect
      expect('foobar').to.match(/^foo/);
      expect('foobar').to.have.string('bar');

      // should
      'foobar'.should.match(/^foo/);
      'foobar'.should.have.string('bar');
    });

    it('API: keys', function () {
      // expect
      expect({foo: 1, bar: 2}).to.have.any.keys('foo');
      expect({foo: 1, bar: 2}).to.have.any.keys('foo', 'baz');
      expect({foo: 1, bar: 2}).to.contain.any.keys('bar', 'baz');
      expect({foo: 1, bar: 2}).to.contain.any.keys(['foo']);
      //expect({ foo: 1, bar: 2 }).to.contain.any.keys({'foo': 6});
      expect({foo: 1, bar: 2}).to.have.all.keys(['bar', 'foo']);
      expect({foo: 1, bar: 2}).to.have.all.keys({'bar': 6, 'foo': 7});
      expect({foo: 1, bar: 2, baz: 3}).to.contain.all.keys(['bar', 'foo']);
      //expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys([{'bar': 2}]);

      // should
      ({foo: 1, bar: 2}).should.have.any.keys('foo');
      ({foo: 1, bar: 2}).should.have.any.keys('foo', 'baz');
      ({foo: 1, bar: 2}).should.contain.any.keys('bar', 'baz');
      ({foo: 1, bar: 2}).should.contain.any.keys(['foo']);
      ({foo: 1, bar: 2}).should.have.all.keys(['bar', 'foo']);
      ({foo: 1, bar: 2}).should.have.all.keys({'bar': 6, 'foo': 7});
      ({foo: 1, bar: 2, baz: 3}).should.contain.all.keys(['bar', 'foo']);
    });

    it('API: throw', function () {
      // expect
      var err = new ReferenceError('This is a bad function.');
      var fn = function () {
        throw err;
      };
      expect(fn).to.throw(ReferenceError);
      expect(fn).to.throw(Error);
      expect(fn).to.throw(/bad function/);
      expect(fn).to.not.throw('good function');
      expect(fn).to.throw(ReferenceError, /bad function/);
      expect(fn).to.throw(err);
      expect(fn).to.not.throw(new RangeError('Out of range.'));
      //expect(fn).to.throw(ReferenceError).and.not.throw(/good function/);

      // should
      fn.should.throw(ReferenceError);
      fn.should.throw(Error);
      fn.should.throw(/bad function/);
      fn.should.not.throw('good function');
      fn.should.throw(ReferenceError, /bad function/);
      fn.should.throw(err);
      fn.should.not.throw(new RangeError('Out of range.'));
      //should.not.Throw(new RangeError('Out of range.'));
      //fn.should.throw(ReferenceError).and.not.throw(/good function/);
    });

    it('API: itself respondTo', function () {

      // expect
      var obj = {bar: function(){}};
      var Klass = function () {};
      Klass.prototype.bar = function () {};
      Klass.baz = function () {};
      expect(Klass).to.respondTo('bar');
      expect(Klass).not.to.respondTo('baz');
      expect(Klass).itself.to.respondTo('baz');
      expect(Klass).itself.not.to.respondTo('bar');
      expect(obj).to.respondTo('bar');

      // should
      Klass.should.respondTo('bar');
      obj.should.respondTo('bar');
      // Klass.itself.should.respondTo('baz');
    });

    it('API: satisfy', function () {
      var check = function(num) { return num > 0; };
      // expect
      expect(1).to.satisfy(check);
      // should
      (2).should.satisfy(check);
    });

    it('API: closeTo', function () {
      // expect
      expect(1.5).to.be.closeTo(1, 0.5);
      // should
      (1.5).should.be.closeTo(1, 0.5);
    });

    it('API: include members', function () {
      // expect
      expect([1, 2, 3]).to.include.members([3, 2]);
      expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
      expect([4, 2]).to.have.members([2, 4]);
      expect([5, 2]).to.not.have.members([5, 2, 1]);
      expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);

      // should
      [1, 2, 3].should.include.members([3, 2]);
      [1, 2, 3].should.not.include.members([3, 2, 8]);
      [4, 2].should.have.members([2, 4]);
      [5, 2].should.not.have.members([5, 2, 1]);
      [{ id: 1 }].should.deep.include.members([{ id: 1 }]);
    });

    it('API: change', function () {
      // expect
      var obj = { val: 10 };
      var fn = function() { obj.val += 3 };
      var noChangeFn = function() { return 'foo' + 'bar'; };
      expect(fn).to.change(obj, 'val');
      expect(noChangeFn).to.not.change(obj, 'val');

      // should
      fn.should.change(obj, 'val');
      noChangeFn.should.not.change(obj, 'val');
    });


    it('API: increase decrease', function () {
      // expect
      var obj = { val: 10 };
      var fnA = function() { obj.val = 15 };
      var fnS = function() { obj.val = 5 };

      expect(fnA).to.increase(obj, 'val');
      expect(fnS).to.decrease(obj, 'val');

      // should
      fnA.should.increase(obj, 'val');
      fnS.should.decrease(obj, 'val');
    });

  });

});