const express = require('express')
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');

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

const conn_string = "mongodb://localhost:27017";

app.get('/home', (req, res) => {

})

app.post('/api/get-all-data', (req, res) => {
  const token_user = req.body._token;

  if (token_server == token_user) {
    MongoClient.connect(conn_string, function(err, db) {
      if (err) throw err;
      var dbo = db.db("db_example");
      dbo.collection("user").find({}).toArray(function(err, result) {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})