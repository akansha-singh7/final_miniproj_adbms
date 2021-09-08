const express = require("express");
const PORT = 3000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/UserDetails", {
useNewUrlParser : true, 
useUnifiedTopology : true
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.html");
});

app.get("/sign_up",(req,res)=>{
    res.render("index.html");
});

app.get("/login",(req,res)=>{
    res.render("login.html");
});

app.post("/sign_up",(req,res)=>{
   const email = req.body.email;
   const password = req.body.password;

var data = {
      "email":email,
      "password":password
   }
   db.collection('details').insertOne(data,function(err, collection){
   if (err) throw err;
      console.log("Record inserted Successfully");
   });
   return res.redirect('success.html');

});

app.post("/login",(req,res)=>{
   const email = req.body.email;
   const password = req.body.password;

User.findOne({email: email}, (err, foundResults) => {
if (err){
console.log(err);
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

// server config
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});
