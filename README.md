Treasure
========

Treasure is the multisignature analog of a wallet. Unlike a regular wallet that
has only the private keys and public keys of one person, a treasure has the
public keys, but not the private keys, of N different people, M of which are
required to sign transactions. It is still necessary for members of a treasure
to store their private keys in a wallet.

The purpose of treasure is to make multisignature transactions as easy as
regular transactions, or nearly so. Spending bitcoins from a treasure should be
as easy as spending bitcoins from a regular wallet. The only extra hurdle is
that other people are required to sign the transaction before it is broadcast.
This means there is an extra stage.

Normally, you sign a transaction and broadcast it.

Sign -> Broadcast

But with treasure, rather than simply spend bitcoins, what you do is propose
that some bitcoins be spent. Then you can see the transactions that you or
others have proposed, and optionally sign them. Once a transaction is fully
signed, it is broadcast.

Propose -> Sign -> Broadcast

## Class layout

* Treasure: for storing public keys, SINs
* Db: database abstraction layer (local files or remote)
* Wallet: for storing bitcoin private keys, SIN private keys
* Api: manage treasures, wallets, db, SINs

## Dependencies
* Bitcore: for bitcoin stuff
* Cosign: for building multsignature transactions
* Insight: for querying blockchain, broadcasting transactions

## Applications
* treasure-cli: command-line tool
* treasure-web: web interface
* treasure-server: serve the web interface
* treasure-api: remote db storage for wallets, treasures
