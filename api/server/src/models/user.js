'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20]
            }
        }
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
