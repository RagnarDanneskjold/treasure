var imports = require('soop').imports();
var bitcore = imports.bitcore || require('bitcore');

var Treasure = function(M, N) {
  var self = this;
  self.M = 3;
  self.N = 5;
  self.SINs = []; //string
  self.pubKeys = {}; //array of buffer pubKeys for each SIN
};

Treasure.prototype.addPubKey = function(SIN, pubKeyHex) {
  var self = this;
  if (self.SINs.indexOf(SIN) > -1) {
    try {
      var pubKey = new Buffer(pubKeyHex, 'hex');
    }
    catch (e) {
      return false;
    }
    self.pubKeys[SIN].push(pubKey);
    return true;
  }
  else {
    return false;
  }
};

Treasure.prototype.getSortedPubKeys = function(index) {
  var self = this;
  var pubKeys = [];

  for (var i in self.SINs) {
    var SIN = self.SINs[i];
    var pubKey = self.pubKeys[SIN][index];
    pubKeys.push(pubKey);
    if (!pubKey)
      return false;
  }

  //sort lexicographically, i.e. as strings, i.e. alphabetically
  return pubKeys.sort();
};
