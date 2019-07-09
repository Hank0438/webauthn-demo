
const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const utils       = require('../utils');

const url = 'mongodb://localhost:27017';
const dbName = 'testDB';
const client = new MongoClient(url, { useNewUrlParser: true });

let new_users = [
    {
        username: 'admin123',
        password: 'eewr',
        name: 'wwee',
        id: 'Z0mPIyxJy-Bm5IqG_DEGKbUcXlKmzaWZqIPoEAYOouQ', 
    },
    {
        username: 'hank123',
        password: 'eewr',
        name: 'wwee',
        id: 'Z0mPIyxJy-Bm5IqG_DEGKbUcXlKmzaWZqIPoEAXOouQ', 
    },
];

var findDocuments = function(username, db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find({'username': username}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the user");
        //console.log(docs);
        callback(docs);
    });      
}

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Insert some documents
    collection.insertMany(new_users, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted the new_users documents into the collection");
        callback(result);
    });
}

// Use connect method to connect to the Server
client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    
    const db = client.db(dbName);
    insertDocuments(db, function() {
        findDocuments('admin123', db, function(docs) {
            //database = docs;
            client.close();
        });
    });
});

let database = {};
module.exports = database;