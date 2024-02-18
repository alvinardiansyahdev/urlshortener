require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;
const TIMEOUT = 10000;

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const createUrl = require('./models/Url.js').create;
app.post('/api/shorturl', function(req, res, next) {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);
  
  createUrl(req.body.url, (err, data) => {
    clearTimeout(t);

    if (err) {
      return next(err);
    }
    
    res.json({
      original_url: req.body.url,
      short_url: data._id,
    });
  });
});

const findUrl = require('./models/Url.js').find;
app.get('/api/shorturl/:id', (req, res, next) => {
  let t = setTimeout(() => {
    next({ message: "timeout" });
  }, TIMEOUT);

  findUrl(req.params.id, (err, data) => {
    clearTimeout(t);

    if (err) {
      return next(err);
    }

    res.redirect(data.url);
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});