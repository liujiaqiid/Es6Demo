/**
 * Mocha
 * 测试框架，包括了： mocha命令行工具 & 不同风格的接口函数
 *
 * 1. BDD风格的接口函数：
 * 1.1. describe (moduleName, testDetails)
 *    一般使用describe来描述一组test suite(测试组件)，测试某个(子)模块
 *    alias context()
 * 1.2. it (info, function)
 *    一般使用it封装一个实际的集成测试用例test case，包含一个或多个断言
 * 1.3. hook函数 before、after、beforeEach、afterEach ([description],fn)
 *    用于在跑case前后进行数据和环境的初始化
 *
 * 2. TDD风格的接口函数: suite()、test()、suiteSetup()、suiteTeardown()、setup()、teardown()
 * 3. Exports风格
 * 4. QUnit风格
 * 6. mocha常用命令
 *    --reporter  查看输出格式，默认spec
 *
 *
 * Refs：
 * 1. https://github.com/mochajs/mocha
 * 2. http://mochajs.org/
 *
 * Data Driven Test  => Test Driven Dev
 */

var expect = require('chai').expect;
var app = require('../../app');
var util = require('../../lib/common-util');
var request = require('supertest')(app);

//beforeEach(function() {
//  console.log("Root hook!");
//});


describe('Test Mocha libs', function () {
  // 通用
  describe('Common usage', function () {

    // 1. Setting Test duration， 默认小于50ms为良好、小于100为正常、大于100为反应慢
    // this.slow(250);
    // 2. Setting Timeout
    //this.timeout(250);
    //this.timeout(0)//disable timeouts
    //it('should take less than 500ms', function(done){
    //  setTimeout(done, 300);
    //});
    //it('should take less than 500ms as well', function(done){
    //  setTimeout(done, 200);
    //});

    // 3. 同步执行
    it('Synchronous Code', function () {
      expect(1).to.not.equal(2);
      expect(2).to.equal(2);
    });
    // 4. 异步执行, 在it中添加回调函数, mocha会等待该函数被调用才结束
    it('Asynchronous Code', function (done) {
      var User = function () {
      };
      User.prototype.save = function (callback) {
        //do something
        callback();
      };
      var user = new User();
      user.save(function (err) { // you can use 'done' to replace this function
        if (err) throw err;
        done();
      });
    });

  });
  // mocha的hook函数
  describe('Mocha Hooks', function () {
    /**
     * hook 函数可以是同步也可以是异步的
     * hook 函数有作用范围，可以分层级定义，根目录的hook函数是定义在所有的describe之外的，影响全局
     * 使用mocha --dealy命令并配合
     */

    before(function () {
      // runs before all tests in this block
      //console.log("before");
    });

    after(function () {
      // runs after all tests in this block
      //console.log("after");
    });

    beforeEach(function () {
      // runs before each test in this block
      //console.log("before each");
    });

    afterEach(function () {
      // runs after each test in this block
      //console.log("after each");
    });

    // test cases
    // pending test case 待写
    it('should return -1 when the value is not present');
  });
  // 排外性测试, 用于单个suite的测试或者单个case的测试
  describe('Exclusive Tests', function () {
    //describe.only('Only one', function() {//排外测试组件
    //  it('inner it', function () {
    //    expect(1).to.not.equal(2);
    //  });
    //});
    //describe('Another one', function() {
    //  it.only('inner it', function () {//排外测试用例
    //    expect(1).to.not.equal(2);
    //  });
    //});
  });
  // 包含性测试, 用于先表述某个suite或者case，但不实际运行, pending test case
  describe('Inclusive Tests', function () {
    //describe.skip('Skip one', function() {//包含性测试组件
    //});
    //describe('Another one', function() {
    //  it.skip('inner it', function () {//包含性测试用例
    //    expect(1).to.not.equal(2);
    //  });
    //});
  });
  // 动态生成测试用例，参数化配置
  describe('Dynamically Generating Tests', function () {
    function add() {
      return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
        return prev + curr;
      }, 0);
    }

    describe('Local func add()', function () {
      var tests = [
        {args: [1, 2], expected: 3},
        {args: [1, 2, 3], expected: 6},
        {args: [1, 2, 3, 4], expected: 10}
      ];

      tests.forEach(function (test) {
        it('correctly adds ' + test.args.length + ' args', function () {
          var res = add.apply(null, test.args);
          expect(res).to.be.equal(test.expected);
        });
      });
    });
  });
});
