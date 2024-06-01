const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: true }));
const moment = require('moment');
const greeting = require("./services/greetings");
const dbService = require("./services/dbService");

// needed so that when the API is called it will not be blocked?
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();
moment().format(); 
console.log(moment().format('MMM Do, YYYY'));

app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}))
        
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.listen(process.env.PORT, ()=> {
    console.log(`Server is listening on port ${process.env.PORT}. Ready to accept requests`);
});

app.get("/", (req, res) => {
    if (req.session.views){
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.render("index", { views: req.session.views, greetings: ["Hello", "Bonjour", "Hola", "Ciao"], title:"Index" } );
    });
app.get("/home", (req, res) => {
    res.render("home", {title:"Home"});
})
app.get("/about", (req, res) => {
    res.render("about", {title:"About"});
});
app.get("/contact", (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUsers(req);
    result
        .then(data => { 
            res.render("contact", {title:"Contact", data});
        })
        .catch(err => {throw(err)});
    });

app.get("/login", (req, res) => {
    res.render("login", {title: "Login"}); 
})

app.get("/register", (req, res) => {
    res.render("register", {title: "Register"});
})
app.get("/welcome", (req, res) => {
    res.render("welcome", {title: "Welcome"});
})

app.post("/login", (req, res)=> {
    res.send("<h1>Login Processed</h1>");
})

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.redirect("/thank-you-for-feedback");
});

// below are CRUD operations for blog.
// create
app.post("/create-blog", (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.createBlog(req);
    result
    // this works but something is fishy
        .then(data => console.log(data))
        .catch(err => {throw(err)});
        res.redirect("/blogPosts")
})  

// read 
app.get("/blogPosts", (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllBlogs();
    result
        .then(data => res.render("blogPosts", {title: "Blog Posts", data}))
        .catch(err => {throw(err)});
});
    
// update - Not Implemented!
app.patch("/update", (req, res) => {
})

// delete - Not Implemented!
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.post("/register", (req, res) => {
    console.log("Recieved user registration");
    const db = dbService.getDbServiceInstance();
    const result = db.createRegistration(req);
    console.log("Registration successful");
    res.redirect("/login")
    });

app.post("/available", (req, res) => {
    console.log("Username Availability Check");
    console.log(req.body);
    res.render("register");
})

app.get("/thank-you-for-feedback", (req, res) => {
    res.send("Thank you for your feedback!"); 
})

app.get('/greet', (req, res) => {
    res.render(`${__dirname}/views/greetingsPages/${greeting.randomGreeting()}`);
  });

app.use(express.static(__dirname + '/public/'));
app.use("/img", express.static("image_assets"));
app.use("/audio", express.static("audio_assets"));

app.use((req, res, next) => {
    res.status(404).render("errorPage");
});
