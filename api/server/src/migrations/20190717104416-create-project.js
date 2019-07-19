'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Projects', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
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
            return queryInterface.bulkInsert('Projects', [
                {
                    name: 'Test project',
                    description: 'Test description',
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Test project 2',
                    description: 'Test description 2',
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Test project 3',
                    description: 'Test description 3',
                    userId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Projects');
    }
};
