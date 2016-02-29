var util = require('../../lib/common-util');
var assert = require('chai').assert;

describe('lib.common-util', function (){

  describe('CommonMD5', function () {
    it('should return common md5 encrypt string', function (){
      var expect = '202cb962ac59075b964b07152d234b70';
      var actual = util.commonMD5('123');
      assert.equal(expect, actual);
    });
    it('should return common md5 encrypt with salt string', function (){
      var expect = '0dde5185db7da5c81f0fa71696506e4f';
      var actual = util.commonMD5('123', 'salt');
      assert.equal(expect, actual);
    });
    it('should return common md5 encrypt with salt upper string', function (){
      var expect = '0DDE5185DB7DA5C81F0FA71696506E4F';
      var actual = util.commonMD5('123', 'salt', true);
      assert.equal(expect, actual);
    });
  });

  describe('JuliyeMD5', function () {
    var expect = 'A663E8A8836B7D27EAD1CDB2E6FD34EA';
    it('should return juliye md5 encrypt string', function (){
      var actual = util.genJuliyeMD5("123",true);
      assert.equal(expect, actual);
    });
    it('should return common md5 encrypt with salt string', function (){
      var actual = util.genJuliyeMD5("202cb962ac59075b964b07152d234b70",false);
      assert.equal(expect, actual);
    });
  });

});
