const express = require('express')
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3333
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

// Jika ingin mengizinkan domain tertentu:
app.use(cors({
  origin: '*', // Ganti dengan domain frontend kamu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({
  extended: true
}));

const token_server = 'kKKl3NKuXfb6kVkfh61fVafm5Ds1Y3jydxMZAOC';


app.use('/public', express.static(path.join(__dirname, 'public')))
//app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/add-data', (req, res) => {
  res.sendFile(__dirname + '/public/add-data.html')
})

const conn_string = "mongodb://localhost:27017";

app.get('/home', (req, res) => {

})

app.post('/api/search-data', (req, res) => {
  const token_user = req.body._token;
  const $search = req.body._search;

  if (token_server == token_user) {
    MongoClient.connect(conn_stringooooo, function(err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");
      var query = { username: $search };
      dbo.collection("user").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.json(result)
        db.close();
      });
    }); 

  } else {
    res.json({
      message: 'Token Invalid'
    })
  }
})

app.post('/api/get-all-data', (req, res) => {
  const token_user = req.body._token;

  if (token_server == token_user) {
    MongoClient.connect(conn_string, function (err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");
      dbo.collection("user").find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result)
        db.close();
      });
    });

  } else {
    res.json({
      message: 'Token Invalid'
    })
  }
})

app.post('/api/update-data', (req, res) => {
  const token_user = req.body._token;
  const $username_ori = req.body._username_ori;
  const $username = req.body._username;
  const $email = req.body._email;

  if (token_server == token_user) {
    MongoClient.connect(conn_string, function (err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");
      var myQuery = {
        username : $username_ori
      };
      var newValues = {
        $set: {
          username: $username,
          email: $email
        }
      };
      var $res = res;
      dbo.collection("user").updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
         $res.json({
          message: 'Update Success',
          result: true
        })
        db.close();
      });
    });

  } else {
    res.json({
      message: 'Token Invalid'
    })
  }
})

app.post('/api/add-data', (req, res) => {
  const token_user = req.body._token;
  const $username = req.body._username;
  const $email = req.body._email;

  if (token_server == token_user) {
    MongoClient.connect(conn_string, function (err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");
      var data = {
        username: $username,
        email: $email
      };
      var $res = res;
      dbo.collection("user").insertOne(data, function (err, res) {
        if (err) throw err;
        $res.json({
          message: 'Add Success',
          result: true
        })
        db.close();
      });
    });

  } else {
    res.json({
      message: 'Token Invalid'
    })
  }
})

app.post('/api/delete-data', (req, res) => {
  const token_user = req.body._token;
  const $username = req.body._username;

  if (token_server == token_user) {
    MongoClient.connect(conn_string, function (err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");

      dbo.collection("user").deleteOne({
        username: $username
      }, function (err, obj) {
        if (err) throw err;
        res.json({
          message: 'delete success',
          result: true
        })
        db.close();
      });
    });

  } else {
    res.json({
      message: 'Token Invalid'
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})