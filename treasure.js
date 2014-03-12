var imports = require('soop').imports();
var bitcore = imports.bitcore || require('bitcore');

var Treasure = function(network, M, N) {
  var self = this;
  self.network = bitcore.networks[network];
  self.M = 3;
  self.N = 5;
  self.SINs = []; //array of SINs (strings)
  self.pubKeys = {}; //array of pubKeys (buffers) for each SIN
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

Treasure.prototype.addPubKeyHex = function(SIN, pubKeyHex) {
  var self = this;
  try {
    var pubKey = new Buffer(pubKeyHex, 'hex');
  }
  catch (e) {
    return false;
  }
  self.addPubKey(pubKey);
  return true;
};

Treasure.prototype.getAddress = function(index) {
  var self = this;
  var redeemScript = self.getRedeemScript(index);
  var hash = bitcore.util.sha256ripe160(redeemScript);
  var addr = new bitcore.Address(hash, self.network.addressScript);
  return addr;
};

Treasure.prototype.getAddressStr = function(index) {
  var self = this;
  var address = self.getAddress(index);
  return address.as('base58');
};

Treasure.prototype.getPubKeys = function(index) {
  var self = this;

  var pubKeys = [];
  for (var i in self.SINs) {
    var SIN = self.SINs[i];
    var pubKey = self.pubKeys[SIN][index];
    pubKeys.push(pubKey);
    if (!pubKey)
      return false;
  }

  return pubKeys;
};

Treasure.prototype.getRedeemScript = function(index) {
  var self = this;
  var pubKeys = self.getSortedPubKeys(index);
  var script = bitcore.Script.createMultisig(self.N, pubKeys);
  return script;
};

Treasure.prototype.getSortedPubKeys = function(index) {
  var self = this;
  var pubKeys = self.getPubKeys(index);

  //sort lexicographically, i.e. as strings, i.e. alphabetically
  return pubKeys.sort();
};
