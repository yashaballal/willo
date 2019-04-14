const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer =require ('nodemailer');

var mailTransporter = nodemailer.createTransport({
          service: 'gmail',
           auth: {
                  user: 'willojb2@gmail.com',
                  pass: 'youmayenter'
              }
          });

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.post('/', function (req, res) {
  var emailid= req.body.emailID;
  var response = req.body.response;
  db.query('SELECT user_id FROM user WHERE email = ?',[emailid], function (error, results, fields) {
  if (error) {
     console.log("error ocurred",error);}
   else{
    if(results[0]){
      var user_id =results[0].user_id;
      db.query('UPDATE user_feedback SET admin_feedback =?, resolved ="Y" where  user_id=?',[response, user_id], function (error, results, fields) {
      if (error) {
     console.log("error ocurred",error);
       }
       var mailOptions = {
        from: 'willo@gmail.com', // sender address
        to: emailid, // list of receivers
        subject: 'Willo - Thank you for contacting us', // Subject line
        html: response   // plain text body
      };
      mailTransporter.sendMail(mailOptions, function (err, info) {
         if(err){
           console.log("Sent a false");
           res.send({
          "code":200,
          "result":false
        })
         }
          
         else{
          console.log(info);
           res.send({
            "code":200,
            "result":true
            })
         }
           
      });
     });
    }
  }
});
});

 

module.exports = router;
