const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');




//Connection with DB
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'passport'
  });
  
db.connect((err) => {
    if(err)
        throw err;
    console.log('mySQL connected');
});

const app = express();
app.use(cors());
app.use(bodyParser.json())

// Insert
app.post('/addExpense', (req, res) => {
    const {category, amount, description } = req.body;
    let data = 
    {
        user:1, 
        amount:amount, 
        description:description, 
        category:category
    };
    let sql = 'INSERT INTO expenses SET ?';
    let query = db.query(sql, data, (err, result) => {
        if(err)
            throw err;     
    });
    res.send("Expense Inserted");
});

app.get('/getExpenses', (req, res) =>{
    let sql = 'SELECT * FROM expenses WHERE YEAR(date) = 2020 AND MONTH(date) = 10;'
    db.query(sql, function (error, results, fields) {
        if(error)
            throw error;
        else
            res.send(results);
      });
    // res.send("Ok");
});



//Function for lifting the database will be here
//....................l

app.listen('3000', () => {
    console.log("server on port 3000");
})