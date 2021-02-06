const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../db/config')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
        set(value) {
            this.setDataValue('email', value.toString().toLowerCase())
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password_changed_at: {
        type: DataTypes.DATE,
    },
    role: {
        type: DataTypes.STRING,
        values: ['teacher', 'student', 'admin'],
    }
});

User.prototype.toJSON = function () {
    let user = Object.assign({}, this.get());

    delete user.password;
    delete user.password_changed_at;
    return user;
}

User.beforeSave(async (user, options) => {
    if (user.changed('password', user.password)) {
        user.password = await bcrypt.hash(user.password, 12);
    }
})

User.prototype.changedPasswordAfter = function (JWTTimestamp) {
    if (this.password_changed_at) {
        const timestamp = parseInt(this.password_changed_at.getTime() / 1000, 10);

        return JWTTimestamp < timestamp;
    }

    return false;
};

module.exports = User;
