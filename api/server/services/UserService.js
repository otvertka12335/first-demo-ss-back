import database from '../src/models'

class UserService {
    static async getAll() {
        try {
            return await database.User.findAll();
        } catch (e) {
            throw e;
        }
    }

    static async add(newUser) {
        try {
            return await database.User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateUser) {
        try {
            const userToUpdate = await database.User.findOne({
                where: { id: Number(id) }
            });

            if (userToUpdate) {
                await database.User.update(updateUser, { where: { id: Number(id) } });

                return updateUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getA(id) {
        try {
            const theUser = await database.User.findOne({
                where: { id: Number(id) }
            });

            return theUser;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const userToDelete = await database.User.findOne({ where: { id: Number(id) } });

            if (userToDelete) {
                const deletedUser = await database.User.destroy({
                    where: { id: Number(id) }
                });
                return deletedUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
