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
//const userlogin=require('./router/routes/userlogin');

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



//Catch all other route requests and return it to the index
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'dist/angular-app/index.html'));
});


const port = process.env.PORT || 4600;

app.listen(port, (req, res)=>{
  console.log(`RUNNING on port ${port}`);
});
