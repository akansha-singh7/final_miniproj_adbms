var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/UserDB');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})
var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.post('/sign_up', function(req,res){
   var email =req.body.email;
   var pass = req.body.password;

   var data = {
      "email":email,
      "password":pass,
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');
})

app.post('/login', function(req,res){
   var email =req.body.email;
   var pass = req.body.password;

   var data = {
      "email":email,
      "password":pass,
   }
   db.collection('details').findOne({email: email},function(err, collection){
  if (err){
res.render("error.html");
}
else{
if (foundResults.password == password){
res.render("success.html");
}
else{
res.render("error.html");
}
}
})
});

app.get('/',function(req,res){
   res.redirect('index.html');
}).listen(3000)

console.log("server listening at port 3000");
