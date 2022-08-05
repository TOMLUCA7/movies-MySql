import Sequelize from 'sequelize';

const  sequelize = new Sequelize(
   // database name
   'moviesdb',

   // database username
   'root',

   // database password
   'tommizrahi10',
   
   // config
   {
       dialect: 'mysql',
       host: 'localhost'
   }

);

export default sequelize;