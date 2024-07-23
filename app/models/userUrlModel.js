const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const UserUrl = sequelize.define('UserUrl', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    urlId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = UserUrl;
