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
                type: Sequelize.STRING(2555)
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
                    name: 'angular6-jwt-authenticate',
                    description: `angular-6-jwt-authentication-example Angular 6 JWT
                    Authentication Example with Webpack 4 To see a demo and further details go to
                    http://jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial`,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'angular-8-registr-login',
                    description: `angular-8-registration-login-example Angular 8 User Registration and
                    Login Example with Webpack 4 Full tutorial with example available at
                    https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial`,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'angular-8-custom-modal',
                    description: `angular-8-custom-modal Angular 8 Custom Modal with Angular CLI Demo and documentation
                    at https://jasonwatmore.com/post/2019/07/12/angular-8-custom-modal-window-dialog-box`,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'node-role-authorization',
                    description: `node-role-based-authorization-api Node.js Role Based Authorization API For
                    documentation and instructions check out
                    http://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api`,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'angular-8-authentication',
                    description: `angular-8-basic-authentication-example Angular 8 - Basic HTTP Authentication
                    Example with Angular CLI For a demo and further details see
                    https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example`,
                    userId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'angular-8-pagination',
                    description: `angular-8-node-server-side-pagination Angular 8 + Node - Server Side Pagination
                    Example For a demo and further details see
                    https://jasonwatmore.com/post/2019/06/28/angular-8-node-server-side-pagination-tutorial-example`,
                    userId: 1,
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
