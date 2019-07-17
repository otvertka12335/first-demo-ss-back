'use strict';
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {});
    Project.associate = function (models) {
        // associations can be defined here
        Project.belongsTo(models.User, {foreignKey: 'userId', as: 'User'})
    };
    return Project;
};
