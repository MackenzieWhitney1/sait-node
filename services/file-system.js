const fs = require("fs");
fs.appendFile("newFile.txt", "Hello World! (again)", err => {
if (err) throw err;
console.log("File saved.");
});
fs.open('newFile2.txt', 'w', (err, file) => {
    if (err) throw err;
    console.log('File saved.');
    });
fs.writeFile("newfile3.txt", "Bonjour monde!", err => {
if (err) throw err;
console.log("File saved.");
});
fs.unlink("newFile2.txt", err => {
    if (err) throw err;
    console.log("File deleted.");
    });
fs.rename("newfile.txt", "renamedFile.txt", err => {
if (err) throw err;
console.log("File renamed.");
})

let file = fs.readFile("number.txt", "utf8", logFile);
function logFile(err, data) {
    if (err) throw err;
    console.log(data);
}