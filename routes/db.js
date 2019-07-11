
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
/*
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
*/

let database = {
    admin:
        { name: 'Hank',
          registered: true,
          id: 'bM1cHI8WzhII4yAqXe9WTvg119BTihtev8H0ci2EmdI',
          authenticators: 
            [ { fmt: 'fido-u2f',
                publicKey:
                'BCQOGm3axfEd7E4k7EMm7DK_GkEmALZFqtYn_t3XluKCG4BmI_lGC4Kj1va8ueTxQROL48edyKc7_ymrWl8f4Jw',
                counter: 76, // not importants
                credID:
                'S0nX4YkP9cBF9Y785dCerPtyxdPhBg6kYA3hh13LqE2xyzg2GIitNa44wqaegCWUvaDRgNVoWSBju3J2J_-Ohg' } ]
        } 
};
module.exports = database;