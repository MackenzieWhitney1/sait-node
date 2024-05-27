const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const app = express();
const port = 8000;
var moment = require('moment');
var greeting = require("./greetings");
moment().format(); 
console.log(moment().format('MMM Do, YYYY'));

app.listen(8000, ()=> {
    console.log(`Server is listening on port ${port}. Ready to accept requests`);
})

app.use(express.static("views", {
    extensions: ["html"]
}));
app.use(express.static("public"));

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
})

// can't get this to work.
app.get('/', function(req, res) {
    res.render(`/greetingsPages/${greeting.randomGreeting()}.html`);
  });