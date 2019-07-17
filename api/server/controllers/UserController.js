import UserService from '../services/UserService';
import Util from '../utils/Utils';

const util = new Util();

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

    static async addUser(req, res) {
        if (!req.body.username || !req.body.name) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newUser = req.body;
        try {
            const createdUser = await UserService.add(newUser);
            util.setSuccess(201, 'User Added!', createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
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

    static async getAUser(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const theUser = await UserService.getA(id);

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
