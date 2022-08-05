// רושמים סכמות של db
// mysql סכמה ל
import sequelize from 'sequelize';

import database from '../db.js';
                                 // שם הטבלה
const account = database.define('movies', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false, // האם לאפשר לשדה להיות רק (בהתחלה false)
        primaryKey: true,
        autoIncrement: true // כול רשומה תקדם ב1
    },

    moviename: sequelize.STRING,
    
    moviedescription: sequelize.TEXT,

    movieimage: sequelize.STRING,

    moviegenre: sequelize.STRING,

    movielength: sequelize.INTEGER,

    rate: sequelize.STRING,

    year: sequelize.INTEGER,

    director: sequelize.STRING
 
}); 

export default account;