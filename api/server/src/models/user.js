'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 20]
            }
        },
        password: {
            type: DataTypes.STRING,
        },
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
