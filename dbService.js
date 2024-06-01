const mysql = require('mysql');
const path = require("path");
const dotenv = require('dotenv').config({ path: '.env' })

let instance;
const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

conn.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + conn.state)
})

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllBlogs() {
        try {
            const response = await new Promise((resolve, reject) => {
                const sql = "SELECT * FROM blogs;";

                conn.query(sql, function(err, result, fields) {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch(error) {
            throw error;
        }
    }

    async createBlog(req) {
        try {
            const insertID = await new Promise((resolve, reject) => {
                const sql = "INSERT INTO blogs (blogTitle, blogPost, `userID`) VALUES (?, ?, ?);";
                const params = [req.body.blogTitle, req.body.blogPost, 1];
                conn.query(sql, params, function(err, result, fields) {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertID);
                })
            });
            console.log(`Insert ID is: ${insertID}`);
            return insertID;
        } catch(error) {
            throw error;
        }
    }
    async createRegistration(req) {
        try {
            const insertID = await new Promise((resolve, reject) => {
                const sql = "INSERT INTO users (username, password, phone, email, firstName) \
                VALUES (?, ?, ?, ?, ?);";
                const params = [req.body.fldUsername, req.body.fldPassword, req.body.fldPhone, req.body.fldEmail, req.body.fldFirst];
                conn.query(sql, params, function(err, result, fields) {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertID);
                })
            });
            console.log(`Insert ID is: ${insertID}`);
            return insertID;
        } catch(error) {
            throw error;
        }
    }
    
}

module.exports = DbService;