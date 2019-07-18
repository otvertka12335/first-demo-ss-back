'use strict';
module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        project: DataTypes.INTEGER,
        user: DataTypes.INTEGER,
        role: DataTypes.ENUM('maintainer', 'developer'),
    }, {});
    Team.associate = function (models) {
        // associations can be defined here
        Team.belongsTo(models.Project, {foreignKey: 'project', as: 'project_id'});
        Team.belongsTo(models.User, {foreignKey: 'user', as: 'user_id'});
    };
    return Team;
};
