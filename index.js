// קריאה לסיפריות
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from 'sequelize';


// קריאה של קובץ דעתה באסי
import database from './db.js';


// יצירת אפליקציה שרת
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // כול ההתנהלות בגסון

// קריאה לקבצים
import account from './api/account.js';
import movies from './api/movies.js';

// לאן לגשת להביא את המידע
app.use('/api/accounts', account);
app.use('/api/movies', movies);


// root
const port = 3000;
database.sync().then(results => {
    console.log(results)
    app.listen(port, function(){
    console.log(`server is working ${port}`);
    });
}).catch(error => {
    console.log(error);
});

