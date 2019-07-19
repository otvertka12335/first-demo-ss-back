'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Teams', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            project: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Projects',
                    key: 'id'
                }
            },
            user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            role: {
                type: Sequelize.ENUM('maintainer', 'developer'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(() => {
            return queryInterface.bulkInsert('Teams', [
                {
                    project: 1,
                    user: 2,
                    role: 'maintainer',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    project: 1,
                    user: 3,
                    role: 'developer',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Teams');
    }
};
