var assert = require('assert');
var should = require('should');
var Treasure = require('../treasure');

describe('Treasure', function() {
  describe('#Treasure', function() {
    it('should create a new treasure', function() {
      var treasure = new Treasure('testnet', 3, 5);
      should.exist(treasure);
    });
  });
});
