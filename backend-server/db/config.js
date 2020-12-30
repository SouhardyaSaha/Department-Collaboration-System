const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dept_collab_system', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
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