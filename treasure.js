var imports = require('soop').imports();
var bitcore = imports.bitcore || require('bitcore');
//var Cosign = imports.Cosign || require('cosign');
//var Insight = imports.Insight || require('insight-bitcore-api');

var Treasure = function(M, N) {
  var self = this;
  self.M = 5;
  self.N = 3;
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

  pubKeysBuf.sort(function(k1, k2) {
    //first, make them the same length
    if (k1.length > k2.length) {
      var k = new Buffer(k1.length);
      k.fill(0);
      var i = k1.length - k2.length;
      k2.copy(k, k1.length - k2.length);
      k2 = k;
    }
    else if (k2.length > k1.length) {
      var k = new Buffer(k2.length);
      k.fill(0);
      var i = k2.length - k1.length;
      k1.copy(k, k2.length - k1.length);
      k1 = k;
    }
    
    //sort as big endian numbers
    for (var i in k1) {
      var x = k1[i];
      var y = k2[i];
      if (x < y)
        return -1;
      if (x > y)
        return 1;
      else
        continue;
    }
    return 0;
  });

  return pubKeysBuf;
};
