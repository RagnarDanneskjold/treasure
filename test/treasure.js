var assert = require('assert');
var should = require('should');
var Treasure = require('../treasure');
var bitcore = require('bitcore');

describe('Treasure', function() {

  var testSINs= [
    '455623',
    '455624',
    '455625',
    '455626',
    '455627',
    ];

  var testPubKeysHex = [
    '02c525d65d18be8fb36ab50a21bee02ac9fdc2c176fa18791ac664ea4b95572ae0',
    '02b937d54b550a3afdc2819772822d25869495f9e588b56a0205617d80514f0758',
    '0266dd7664e65958f3cc67bf92ad6243bc495df5ab56691719263977104b635bea',
    '02ee91377073b04d1d9d19597b81a7be3db6554bd7d16151cb5599a6107a589e70',
    '02c8f63ad4822ef360b5c300f08488fa0fa24af2b2bebb6d6b602ca938ee5af793'
    ];

/* 
how to make some test pubkeys in the node terminal:

> var bitcore = require('./bitcore');
undefined
> var Key = bitcore.KeyModule.Key;
undefined
> Key.generateSync().public.toString('hex');
'02c525d65d18be8fb36ab50a21bee02ac9fdc2c176fa18791ac664ea4b95572ae0'
> Key.generateSync().public.toString('hex');
'02b937d54b550a3afdc2819772822d25869495f9e588b56a0205617d80514f0758'
> Key.generateSync().public.toString('hex');
'0266dd7664e65958f3cc67bf92ad6243bc495df5ab56691719263977104b635bea'
> Key.generateSync().public.toString('hex');
'02ee91377073b04d1d9d19597b81a7be3db6554bd7d16151cb5599a6107a589e70'
> Key.generateSync().public.toString('hex');
'02c8f63ad4822ef360b5c300f08488fa0fa24af2b2bebb6d6b602ca938ee5af793'

*/

  describe('#Treasure', function() {
    it('should create a new treasure', function() {
      var treasure = new Treasure('testnet', 3, 5);
      should.exist(treasure);
      treasure.network.name.should.equal('testnet');
      treasure.M.should.equal(3);
      treasure.N.should.equal(5);
    });
  });

  describe('#addPubKey', function() {
    it('should add a public key to the treasure', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      var pubKey = new Buffer(testPubKeysHex[0], 'hex');
      treasure.addPubKey(testSINs[0], pubKey);
    });
  });

  describe('#addPubKeyHex', function() {
    it('should convert and add a hex public key to the treasure', function() {
      var treasure = new Treasure('testnet', 3, 5);
      var SIN = testSINs[0];
      treasure.addSIN(SIN);
      var pubKey = new Buffer(testPubKeysHex[0], 'hex');
      var pubKeyHex = pubKey.toString('hex');
      treasure.addPubKeyHex(SIN, pubKeyHex)
      treasure.pubKeys[SIN][0].toString().should.equal(pubKey.toString());
    });
  });

  describe('#addSIN', function() {
    it('should add a SIN to the treasure', function() {
      var treasure = new Treasure('testnet', 3, 5);
      var SIN = testSINs[0];
      treasure.addSIN(SIN);
      treasure.SINs.length.should.equal(1);
      treasure.SINs[0].should.equal(SIN);
    });
  });

  describe('#getAddress', function() {
    it('should return an address', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      should.exist(treasure.getAddress(0));
    });
  });

  describe('#getAddressStr', function() {
    it('should return a properly formatted testnet address', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      var addrStr = treasure.getAddressStr(0);
      should.exist(addrStr);
      addrStr[0].should.equal('2');
    });

    it('should return a properly formatted mainnet address', function() {
      var treasure = new Treasure('livenet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      var addrStr = treasure.getAddressStr(0);
      should.exist(addrStr);
      addrStr[0].should.equal('3');
    });
  });

  describe('#getPubKeys', function() {
    it('should return the pubKeys', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      treasure.getPubKeys(0)[0].toString('hex').should.equal(testPubKeysHex[0]);
      treasure.getPubKeys(0)[1].toString('hex').should.equal(testPubKeysHex[1]);
      treasure.getPubKeys(0)[2].toString('hex').should.equal(testPubKeysHex[2]);
      treasure.getPubKeys(0)[3].toString('hex').should.equal(testPubKeysHex[3]);
      treasure.getPubKeys(0)[4].toString('hex').should.equal(testPubKeysHex[4]);
    });
  });

  describe('#getRedeemScript', function() {
    it('should return a correct redeem script', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      var redeemScript = treasure.getRedeemScript(0);
      should.exist(redeemScript);
      redeemScript.chunks[0].should.equal(80 + 3); //M
      redeemScript.chunks[1].toString('hex').should.equal(testPubKeysHex[2]); //sorted pubKeys
      redeemScript.chunks[2].toString('hex').should.equal(testPubKeysHex[1]);
      redeemScript.chunks[3].toString('hex').should.equal(testPubKeysHex[0]);
      redeemScript.chunks[4].toString('hex').should.equal(testPubKeysHex[4]);
      redeemScript.chunks[5].toString('hex').should.equal(testPubKeysHex[3]);
      redeemScript.chunks[6].should.equal(80 + 5); //N
      redeemScript.chunks[7].should.equal(bitcore.Opcode.map.OP_CHECKMULTISIG);
    });
  });

  describe('#getSortedPubKeys', function() {
    it('should get the pubkeys in properly sorted order', function() {
      var treasure = new Treasure('testnet', 3, 5);
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKeyHex(testSINs[0], testPubKeysHex[0]);
      treasure.addPubKeyHex(testSINs[1], testPubKeysHex[1]);
      treasure.addPubKeyHex(testSINs[2], testPubKeysHex[2]);
      treasure.addPubKeyHex(testSINs[3], testPubKeysHex[3]);
      treasure.addPubKeyHex(testSINs[4], testPubKeysHex[4]);
      treasure.getSortedPubKeys(0)[0].toString('hex').should.equal(testPubKeysHex[2]);
      treasure.getSortedPubKeys(0)[1].toString('hex').should.equal(testPubKeysHex[1]);
      treasure.getSortedPubKeys(0)[2].toString('hex').should.equal(testPubKeysHex[0]);
      treasure.getSortedPubKeys(0)[3].toString('hex').should.equal(testPubKeysHex[4]);
      treasure.getSortedPubKeys(0)[4].toString('hex').should.equal(testPubKeysHex[3]);
    });
    
    it('should sort these strings as though they were public keys', function() {
      var treasure = new Treasure('testnet', 3, 6);
      var myStrings = [
        'aa',
        'a',
        'b',
        'z',
        'x'
        ];
      treasure.addSIN(testSINs[0]);
      treasure.addSIN(testSINs[1]);
      treasure.addSIN(testSINs[2]);
      treasure.addSIN(testSINs[3]);
      treasure.addSIN(testSINs[4]);
      treasure.addPubKey(testSINs[0], new Buffer(myStrings[0]));
      treasure.addPubKey(testSINs[1], new Buffer(myStrings[1]));
      treasure.addPubKey(testSINs[2], new Buffer(myStrings[2]));
      treasure.addPubKey(testSINs[3], new Buffer(myStrings[3]));
      treasure.addPubKey(testSINs[4], new Buffer(myStrings[4]));
      treasure.getSortedPubKeys(0)[0].toString().should.equal('a');
      treasure.getSortedPubKeys(0)[1].toString().should.equal('aa');
      treasure.getSortedPubKeys(0)[2].toString().should.equal('b');
      treasure.getSortedPubKeys(0)[3].toString().should.equal('x');
      treasure.getSortedPubKeys(0)[4].toString().should.equal('z');
    });
  });
});
