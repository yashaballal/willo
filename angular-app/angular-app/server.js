const express= require('express');
const path= require('path');
var cors = require('cors');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
const app = express();
app.use(cors());

//Getting our POSTS routes
const posts=require('./router/routes/posts');
const stats=require('./router/routes/stats');
const useraccounts=require('./router/routes/useraccounts');
const customerfb = require('./router/routes/customerfb');
const fpwd = require('./router/routes/fpwd');
const customermail=require('./router/routes/customermail');
const addadmin = require('./router/routes/addadmin');
const financial = require('./router/routes/financial');
const piedetails = require('./router/routes/piedetails');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Refers to the distribution module
app.use(express.static(path.join(__dirname, '/dist')));

app.use('/api/auth', posts);
app.use('/api/stats', stats);
app.use('/api/useraccount', useraccounts);
app.use('/api/customerfb', customerfb);
app.use('/api/fpwd', fpwd);
app.use('/api/customermail', customermail);
app.use('/api/addadmin', addadmin);
app.use('/api/financial', financial);
app.use('/api/piedetails', piedetails);

//Catch all other route requests and return it to the index
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});


const port = process.env.PORT || 4600;

app.listen(port, (req, res)=>{
  console.log(`RUNNING on port ${port}`);
});
