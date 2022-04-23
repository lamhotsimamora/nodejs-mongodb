const express = require('express')
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3050

app.get('/', (req, res) => {

  const url = "mongodb://localhost:27017/";
  const database = 'db_mahasiswa';
  const table = 'mahasiswa';

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);

    dbo.collection(table).findOne({}, function (err, result) {
      if (err) throw err;
      res.send(result)
      db.close();
    });
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})