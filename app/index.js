const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://user:pass@mongodb:27017/gns-api?authMechanism=SCRAM-SHA-1&authSource=admin';
const dbName = 'gns-api';
const collectionName = 'sports-event';

const client = new MongoClient(url);

client.connect(function(err) {
  assert.equal(null, err, "Could not connect to MongoDB server");
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  db.collection(collectionName)
    .find({})
    .toArray((err, docs) => {
      assert.equal(null, err, "Could not find any documents");
      console.log("Found documents!");
      console.log(docs);
      client.close();
    });
});
