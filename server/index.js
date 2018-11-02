var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3003;
 var db = require('../database-mongo/index.js')

var app = express();


app.use(express.static(path.join(__dirname, '/../react-client/dist')));

app.get('/buy/:prod_name/overview', (req, res) => {
  db.getOverviewData(req.params.prod_name)
  .then((data) => {
    res.status(201).send(data);
  })
  .catch((err) => {
    console.error(err);
  });

});



  app.get('/buy/*', (req, res) => {
    // res.send('hello')
    res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'))
  });

  app.listen(port, function() {
    console.log('listening on port 3003!');
  });

