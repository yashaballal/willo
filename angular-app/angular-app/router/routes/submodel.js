const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
  console.log("Reached submodel in server");
   db.query('SELECT * FROM subscription_model', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    res.send(JSON.stringify(results));
  });
});

router.post('/', function (req, res) {
  console.log("Reached submodel in post");
  console.log("sub_price:" +req.body.subInput);
  var sub_price = req.body.subInput;
  var discount = req.body.discInput;
  if(sub_price===""&&discount===""){

  	console.log("Nothing updated!");
		
		res.send({
			"code":200,
			"result":false
		});
		throw error;

  }
  else if(sub_price!=""&&discount!=""){
  	console.log("Both updated!");

  	var sql = "UPDATE subscription_model SET discount_percent= (\'"+discount+"\'), annual_sub_price =(\'"+sub_price+"\')"
  	db.query(sql, function (error, results, fields){
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

  }
  else if(sub_price===""){
  	console.log("Discount updated!");
  	var sql = "UPDATE subscription_model SET discount_percent= (\'"+discount+"\')"
  	db.query(sql, function (error, results, fields){
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
  }
  else{
  	console.log("Sub Price updated!");
  	var sql = "UPDATE subscription_model SET annual_sub_price= (\'"+sub_price+"\')"
  	  	db.query(sql, function (error, results, fields){
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
  	}
});

module.exports = router;
