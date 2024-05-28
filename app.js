const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
var moment = require('moment');
var greeting = require("./greetings");
moment().format(); 
console.log(moment().format('MMM Do, YYYY'));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.listen(8000, ()=> {
    console.log(`Server is listening on port ${port}. Ready to accept requests`);
});

app.get("/login", (req, res) => {
    res.send("<form method='POST'><input type='text' name='username'/><input type='submit' /></form>"); 
})

app.post("/login", (req, res)=> {
    res.send("<h1>Login Processed</h1>");
})

app.use(express.urlencoded({ extended: true }));
app.post("/create-post", (req, res) => {
    res.redirect("/thank-you");
})

app.get("/thank-you", (req, res) => {
    res.send("Thank you for your post!"); 
})

// sendFile for non-static pages. render for static.
app.get('/greet', (req, res) => {
    res.sendFile(`${__dirname}/greetingsPages/${greeting.randomGreeting()}.html`);
  });

app.use(express.static(__dirname + '/views/', {
    extensions: ["html"]
}));
app.use(express.static(__dirname + '/public/'));

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});
