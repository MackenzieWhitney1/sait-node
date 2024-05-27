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
/* http.createServer((request, response) => {
    console.log("HTTP Request: " + request.url);
    let parsedAddress = url.parse(request.url, true);
    let file = "." + parsedAddress.pathname;

    if(parsedAddress.pathname == "/"){
        file = `./greetingsPages/${greeting.randomGreeting()}.html`;
    }
    fs.readFile(file, (err,data) => {
        console.log("Serving file: "+file);
        if (err) {
            console.log(file);
            console.log("File missing")
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("<h1>404: Page Not Found</h1>");
            return response.end();
        }
        console.log("File present.")
        var fileParts = file.split(".");
        var fileType = fileParts[fileParts.length - 1];
        if (fileType=="css"){
            response.writeHead(200, { "Content-Type": "text/css"});
        } else if (fileType == "js") {
            response.writeHead(200, { "Content-Type": "text/javascript"})
        } else if (fileType == "html") {
            response.writeHead(200, { "Content-Type" : "text/html"})
        } else {
            response.writeHead(200, { "Content-Type" : "text/plain"})
        }
        response.write(data);
        return response.end();
    });
        
}).listen(port, () => 
    {console.log(`Server running on port ${port}`)});
 */