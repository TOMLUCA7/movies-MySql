// רושמים סכמות של db
// mysql סכמה ל
import sequelize from 'sequelize';

import database from '../db.js';
                                 // שם הטבלה
const account = database.define('user', {
    id: {
        type: sequelize.INTEGER,
        allowNull: false, // האם לאפשר לשדה להיות רק (בהתחלה false)
        primaryKey: true,
        autoIncrement: true // כול רשומה תקדם ב1
    },

    firstname: sequelize.STRING,
    lastname: sequelize.STRING,

    email: {
        type: sequelize.STRING,
        allowNull: false
    },

    password: {
        type: sequelize.STRING,
        allowNull: false
    },

    passcode : {
        type: sequelize.INTEGER,
        allowNull: false,
    },

    isApproved: {
        type:sequelize.BOOLEAN,
        allowNull: false,
    }
    
}); 

export default account;