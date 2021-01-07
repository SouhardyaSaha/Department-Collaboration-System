const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_complete','root','Pass',{
    dialect:'mysql',
    host:'localhost'
  });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({force: true});
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()


module.exports = sequelize