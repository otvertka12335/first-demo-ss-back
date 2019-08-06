'use strict';
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [3, 25]
            }
        },
        description: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});
    Project.associate = function (models) {
        // associations can be defined here
        Project.belongsTo(models.User, {foreignKey: 'userId', as: 'User'})
    };
    return Project;
};
