const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.post('/', function (req, res) {
  console.log("Reached addadmin in server");
   var emailid = req.body.emailID;
   console.log("Reached 1");
   var password = req.body.password;
   console.log("Reached 2");
   if(emailid ==="" || password==="")
   {
   		console.log("Blank values entered!");
		res.send({
			"code":200,
			"result":false
		});
		throw error;
   }
   	
   var sql = "INSERT INTO admin (username, password) VALUES (\'"+emailid+"\',\'"+password+"\')"
   db.query(sql, function (error, results, fields) {
    if (error) 
	{
		console.log(error);
		res.send({
			"code":200,
			"result":false
		});
		throw error;
	}
	else
	    res.send({            
	    	"code":200,
	        "result":true
		});
  });
});

module.exports = router;
