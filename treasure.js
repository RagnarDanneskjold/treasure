var imports = require('soop').imports();
var bitcore = imports.bitcore || require('bitcore');
//var Cosign = imports.Cosign || require('cosign');
//var Insight = imports.Insight || require('insight-bitcore-api');

var Treasure = function(M, N, name) {
  var self = this;
  self.M = M;
  self.N = N;
  self.name = name;
};

Treasure.prototype.addPubKeys = function(user, pubkeys, signature) {
};

Treasure.prototype.backup = function() {
};

Treasure.prototype.broadcastTX = function(tx) {
};

Treasure.prototype.getBalance = function() {
};

Treasure.prototype.getMembers = function() {
};

Treasure.prototype.getNextReceivingAddress = function() {
};

Treasure.prototype.hasAllPubKeys = function() {
};

Treasure.prototype.hasNextReceivingAddress = function() {
  var self = this;
  return self.hasAllPubKeys();
};

Treasure.prototype.newPTX = function(amountBTC, address) {
};

Treasure.prototype.validatePTX = function(ptx) {
};

Treasure.prototype.signPTX = function(ptx, privkey) {
};

