const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Url = sequelize.define('Url', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    urlType: {
        type: DataTypes.INTEGER
    },
    abnormal_url: {
        type: DataTypes.INTEGER
    },
    slash2: {
        type: DataTypes.INTEGER
    },
    protocol: {
        type: DataTypes.INTEGER
    },
    sub_domain: {
        type: DataTypes.INTEGER
    },
    having_ip_address: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

module.exports = Url;
