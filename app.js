const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
var moment = require('moment');
var greeting = require("./greetings");
var mysql = require('mysql');
moment().format(); 
console.log(moment().format('MMM Do, YYYY'));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "travelexperts"
    });
/* con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT customers.CustFirstName, customers.CustLastName, bookings.BookingNo \
    FROM customers JOIN bookings \
    ON customers.CustomerId = bookings.CustomerId";
    con.query(sql, function (err, result) {
        if(err) throw err;
        result.forEach(row => { 
            console.log(JSON.stringify(row));
        });
        // console.log("Result: " + JSON.stringify(result));
        con.end(function(err){
            if(err) throw err;
        })
    })
}); */
        
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.listen(8000, ()=> {
    console.log(`Server is listening on port ${port}. Ready to accept requests`);
});

app.get("/", (req, res) => {
    res.render("index", { greetings: ["Hello", "Bonjour", "Hola", "Ciao"], title:"Index" } );
    });
app.get("/home", (req, res) => {
    res.render("home", {title:"Home"});
})
app.get("/about", (req, res) => {
    res.render("about", {title:"About"});
});
app.get("/contact", (req, res) => {
    /* con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
 */        var sql = "SELECT * FROM agents";
        con.query(sql, function (err, result) {
            if(err) throw err;
            // console.log("Result: " + JSON.stringify(result));
            res.render("contact", {title:"Contact", agents: result});
            /* con.end(function(err){
                if(err) throw err;
            }); */
        })
    });
app.get("/demo", (req, res) => {
    res.render("demo", {title: "Demo"});
});    

app.get("/login", (req, res) => {
    res.send("<form method='POST'><input type='text' name='username'/><input type='submit' /></form>"); 
})

app.get("/create-post", (req, res) => {
    res.render("create-post", {title: "Create Post"});
})

app.post("/login", (req, res)=> {
    res.send("<h1>Login Processed</h1>");
})
app.use(express.urlencoded({ extended: true }));
app.post("/contact", (req, res) => {
    console.log(req.body);
    res.redirect("/thank-you-for-feedback");
});
app.use(express.urlencoded({ extended: true }));
app.post("/create-post", (req, res) => {
    res.redirect("/thank-you");
})

app.get("/thank-you", (req, res) => {
    res.send("Thank you for your post!"); 
})
app.get("/thank-you-for-feedback", (req, res) => {
    res.send("Thank you for your feedback!"); 
})

app.get('/greet', (req, res) => {
    res.render(`${__dirname}/greetingsPages/${greeting.randomGreeting()}`);
  });

/* app.use(express.static(__dirname + '/views/', {
    extensions: ["html"]
})); */
app.use(express.static(__dirname + '/public/'));
app.use("/img", express.static("image_assets"));

app.use((req, res, next) => {
    res.status(404).render("errorPage");
});
