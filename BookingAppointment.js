const http=require('http');

const express=require('express');
const { Console } = require('console');

const app=express();



app.use((req,res,next)=>{
    console.log("i'M A first MIDDLEWERE");
    next() // this is midleware for allow the request for next midleware line
})
app.use((req,res,next)=>{
    console.log("i'M A second MIDDLEWERE");
    res.send(<h1> HI, this is my express js code </h1>)

})
app.use((req,res,next)=>{
    console.log("i'M A third MIDDLEWERE");

})

const server= http.createServer(app);

server.listen(8080);