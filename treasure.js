var imports = require('soop').imports();
var bitcore = imports.bitcore || require('bitcore');
//var Cosign = imports.Cosign || require('cosign');
//var Insight = imports.Insight || require('insight-bitcore-api');

var Treasure = function(M, N) {
  var self = this;
  self.M = 3;
  self.N = 5;
  self.SINs = [];
  self.pubKeys = {}; //array of hex pubKeys for each SIN
};

Treasure.prototype.addPubKey = function(SIN, pubKey) {
  var self = this;
  if (self.SINs.indexOf(SIN) > -1) {
    self.pubKeys[SIN].push(pubKey);
    return true;
  }
  else {
    return false;
  }
};

Treasure.prototype.getSortedPubKeys = function(i) {
  var self = this;
  var pubKeys = [];
  for (var i in self.SINs) {
    var SIN = self.SINs[i];
    var pubKey = self.pubKeys[SIN];
    pubKeys.push(pubKey);
    if (!pubKey)
      return false;
  }
  return Treasure.sortPubKeys(pubKeys);
};

Treasure.sortPubKeys = function(pubKeys) {
  var pubKeysBuf = [];

  for (var i in pubKeys) {
    try {
      pubKeysBuf[i] = new Buffer(pubKeys[i], 'hex');
    } catch (e) {
      return false;
    }
  }

  //sort lexicographically, i.e. as strings, i.e. alphabetically
  pubKeysBuf.sort();

  return pubKeysBuf;
};
