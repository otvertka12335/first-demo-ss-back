'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
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
            return queryInterface.bulkInsert('Users', [
                {
                    username: 'vkravchik@gmail.com',
                    name: 'Vadym',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'vadim@cloud-mail.net',
                    name: 'Vadym',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'haku@cloud-mail.net',
                    name: 'Haku',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ])
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
