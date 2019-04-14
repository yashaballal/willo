const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
  console.log("Reached financial in server");
   db.query('SELECT * FROM finance where account_status = "D"', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
