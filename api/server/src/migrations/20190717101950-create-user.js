'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const passwordHash = require('password-hash');
        const hash = passwordHash.generate('vkravchik');
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
                    password: hash,
                    accepted: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'vadim@cloud-mail.net',
                    name: 'Vadym',
                    password: hash,
                    accepted: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'haku@cloud-mail.net',
                    name: 'Haku',
                    password: hash,
                    accepted: true,
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
