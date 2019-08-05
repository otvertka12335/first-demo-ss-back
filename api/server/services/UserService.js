import database from '../src/models'
import Sequelize from 'sequelize'
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
import NodeCache from 'node-cache'
import passwordHash from 'password-hash'

const userProfileCache = new NodeCache();
const Op = Sequelize.Op;

const messages = require('../../messages.env');


class UserService {
    static async getAll() {
        try {
            return await database.User.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async getAllWithout(id) {
        try {
            return await database.User.findAll({
                where: {
                    id: {
                        [Op.not]: id
                    }
                }
            });
        } catch (e) {
            throw e;
        }
    }

    static async add(newUser) {
        newUser['password'] = passwordHash.generate(newUser.password);
        try {
            return await database.User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async login(user) {
        try {
            const userFromDb = await UserService.getAUserByEmail(user.username);

            if (userFromDb) {
                if (userFromDb.dataValues.accepted) {
                    console.log(userFromDb.password);
                    if (passwordHash.verify(user.password, userFromDb.password)) {
                        console.log(userFromDb);
                        let token = jwt.sign(userFromDb.dataValues, 'jwt');
                        return token;
                    }
                }
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static async update(id, updateUser) {
        try {
            const userToUpdate = await database.User.findOne({
                where: {id: Number(id)}
            });

            if (userToUpdate) {
                await database.User.update(updateUser, {where: {id: Number(id)}});

                return updateUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getUser(id) {
        try {
            const theUser = await database.User.findOne({
                where: {id: Number(id)}
            });

            return theUser;
        } catch (error) {
            throw error;
        }
    }

    static async getAUserByEmail(email) {
        try {
            const theUser = await database.User.findOne({
                where: {username: email}
            });
            return theUser;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const userToDelete = await database.User.findOne({where: {id: Number(id)}});

            if (userToDelete) {
                const deletedUser = await database.User.destroy({
                    where: {id: Number(id)}
                });
                return deletedUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async sendToken(user) {

        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vkravchik@gmail.com',
                pass: 'mlkxrhobrksbczpj'
            }
        });


        let key = `${user.id}$${user.username}`;
        let token = jwt.sign({
            id: user.id,
            username: user.username
        }, 'jwt', {
            expiresIn: '1h'
        });

        let src = `http://localhost:8000/api/v1/users/activate/${key}/${token}`;
        let mailOptions = {
            from: 'administration@haku.com',
            to: user.username,
            subject: 'Activation account ✔',
            text: '',
            html: `<h1><a href="${src}">Accept link</a></h1>`
        };
        const res = await transporter.sendMail(mailOptions);
        userProfileCache.set(key, token);
        return res
    }

    static async acceptLink(key, token) {
        let parsedKey = key.split('$');

        let userId = parsedKey[0];
        let username = parsedKey[1];
        let decodedToken = jwt.decode(token, 'jwt');
        if (userId == decodedToken.id && username == decodedToken.username) {
            let tmp = {
                accepted: true
            };
            const res = await UserService.update(userId, tmp);
            console.log(res);
            if (res) {
                return res;
            }
        } else {
            console.log('Error');
        }
    }
}

export default UserService;
