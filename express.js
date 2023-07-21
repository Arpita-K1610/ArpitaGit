/* const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./UserRoutes");

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
  console.log(`Server is Woring on port: ${port}`);
});  

const express = require('express')
const path=require('path');
const app = express()
const port = 3000

//const arpiMiddleware=(req,res,next)=>{
//    console.log(req);
//    next()
//}
app.use(express.static(path.join(__dirname, "public")));
//app.use(arpiMiddleware);

app.get('/hello/:name', (req, res) => {
  res.send('Hello World! ' + req.params.name)
})
app.get('/about', (req, res) => {
//    res.send('about')
//res.sendFile(path.join(__dirname, 'express.html'))
    res.json({"Arpi" : 34});
})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});   */


const express=require('express');
const app=express();
const port=3000;

app.get('/',(req,res)=>{
  res.send("<h1>HOME PAGE</h1>");
})
app.get('/about',(req,res)=>{
  res.send("<h1>ABOUT PAGE</h1>");
})
app.get('/contact',(req,res)=>{
  res.send("<h1>CONTACT PAGE</h1>");
})
app.get('/service',(req,res)=>{
  res.send("<h1>SERVICE PAGE</h1>");
})
app.get('/login',(req,res)=>{
  res.send("<h1>LOGIN PAGE</h1>");
});

app.listen(port,()=>{
  console.log(`My server is working on http://localhost:${port}`)
});




