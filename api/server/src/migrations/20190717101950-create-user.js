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
                unique: true,
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            accepted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
                    password: 'vkravchik',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'vadim@cloud-mail.net',
                    name: 'Vadym',
                    password: 'vkravchik',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'haku@cloud-mail.net',
                    name: 'Haku',
                    password: 'vkravchik',
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
