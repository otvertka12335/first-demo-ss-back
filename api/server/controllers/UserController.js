import UserService from '../services/UserService';
import Util from '../utils/Utils';
import TeamService from "../services/TeamService";


const util = new Util();
const messages = require('../src/seeders/messages.env');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAll();
            if (users.length > 0) {
                util.setSuccess(200, 'Users', users);
            } else {
                util.setSuccess(200, 'Users not founded');
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async getAllUsersWithout(req, res) {
        const {id} = req.params;

        try {
            const users = await UserService.getAllWithout(id);
            if (users.length > 0) {
                util.setSuccess(200, 'Users', users);
            } else {
                util.setSuccess(200, 'Users not founded');
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async addUser(req, res) {
        if (!req.body.username || !req.body.name || !req.body.password) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        if (await UserService.getAUserByEmail(req.body.username)) {
            util.setError(400, 'User with this email already exists');
            return util.send(res);
        }
        const newUser = req.body;
        try {
            const createdUser = await UserService.add(newUser);
            util.setSuccess(201, 'You are successfully registered', createdUser);
            UserService.sendToken(createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async login(req, res) {
        if (!req.body.username || !req.body.password) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        let user = req.body;
        try {
            const result = await UserService.login(user);
            if (!result) {
                util.setError(400, 'Login Error');
            } else {
                util.setSuccess(201, 'Login successful', result);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async acceptLink(req, res) {
        const {key, token} = req.params;

        const result = await UserService.acceptLink(key, token);
        if (result) {
            util.setSuccess(200, 'Accepted', result);
            util.send(res.redirect('http://localhost:4200/login'))
        } else {
            util.setError(404, `Accepting error`);
        }
        return util.send(res);
    }

    static async updatedUser(req, res) {
        const alteredUser = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateUser = await UserService.update(id, alteredUser);
            if (!updateUser) {
                util.setError(404, `Cannot find user with the id: ${id}`);
            } else {
                util.setSuccess(200, 'User updated', updateUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getUser(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const theUser = await UserService.getUser(id);

            if (!theUser) {
                util.setError(404, `Cannot find user with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found User', theUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAUserByEmail(req, res) {
        const {email} = req.params;

        try {
            const theUser = await UserService.getAUserByEmail(email);

            if (!theUser) {
                util.setError(404, `Cannot find user with the email ${email}`);
            } else {
                util.setSuccess(200, 'Found User', theUser);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteUser(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const userToDelete = await UserService.delete(id);

            if (userToDelete) {
                util.setSuccess(200, 'User deleted');
            } else {
                util.setError(404, `User with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default UserController;
