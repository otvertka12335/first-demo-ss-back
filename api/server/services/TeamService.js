import database from '../src/models'
import nodeMailer from 'nodemailer'
import Sequelize from 'sequelize'
import jwt from 'jsonwebtoken'
import NodeCache from 'node-cache'

const acceptedTeamCache = new NodeCache();

const Op = Sequelize.Op;


class TeamService {
    static async getAll() {
        try {
            return await database.Team.findAll({
                include: [{
                    all: true
                }],
                order: [
                    ['id', 'DESC']
                ]
            });
        } catch (e) {
            throw e;
        }
    }

    static async add(newTeam) {
        try {
            return await database.Team.create(newTeam);
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateTeam) {
        try {
            const teamToUpdate = await database.Team.findOne({
                where: {id: Number(id)}
            });

            if (teamToUpdate) {
                await database.Team.update(updateTeam, {
                    where: {id: Number(id)},
                    include: [{
                        all: true
                    }]
                });

                return updateTeam;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getA(id) {
        try {
            const theTeam = await database.Team.findOne({
                where: {id: Number(id)},
                include: [{
                    all: true
                }]
            });

            return theTeam;
        } catch (error) {
            throw error;
        }
    }

    static async getATeamByProject(id) {
        try {
            const theTeam = await database.Team.findAll({
                where: {project: Number(id)},
                include: [{
                    all: true
                }]
            });

            return theTeam;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const teamToDelete = await database.Team.findOne({where: {id: Number(id)}});

            if (teamToDelete) {
                const deletedTeam = await database.Team.destroy({
                    where: {id: Number(id)}
                });
                return deletedTeam;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async addTeamMates(id, maintainers, developers) {
        try {
            const deleteProject = database.Team.destroy({
                where: {project: Number(id)}
            });
            if (deleteProject) {
                let arrays = [];

                for (let item of maintainers) {
                    let newPromise = database.Team.create({
                        'project': id,
                        'user': item,
                        'role': 'maintainer'
                    });
                    arrays.push(newPromise);
                }

                for (let item of developers) {
                    let newPromise = database.Team.create({
                        'project': id,
                        'user': item,
                        'role': 'developer',

                    });
                    arrays.push(newPromise);
                }

                return Promise.all(arrays)
            }
        } catch (error) {
            throw error;
        }
    }

    static async getAProjectWhereUserExist(userId) {
        try {
            const theProjects = await database.Team.findAll({
                where: {user: Number(userId)},
                include: [{
                    all: true
                }]
            });

            return theProjects
        } catch (error) {
            throw  error;
        }
    }

    static async sendToken(project, developers, maintainers) {

        let transporter = nodeMailer.createTransport({
            // host: "smtp.mailtrap.io",
            // port: 2525,
            // auth: {
            //     user: "049997c52a02de",
            //     pass: "f8b9e4bab39c41"
            // }
            service: 'gmail',
            auth: {
                user: 'vkravchik@gmail.com',
                pass: 'mlkxrhobrksbczpj'
            }
        });


        let userArray = developers.concat(maintainers);
        let users = await database.User.findAll({
            where: {
                id: {
                    [Op.in]: userArray
                },
            },
            attributes: ['id', 'username']
        });

        let tmp = [];
        for (let i of users) {
            tmp.push(i.username);
            let key = `${project}$${i.id}`;
            let token = jwt.sign({
                projectId: project,
                userId: i.id
            }, 'jwt', {
                expiresIn: '1h'
            });

            let src = `http://localhost:8000/api/v1/teams/accept/mail/${key}/${token}`;
            let mailOptions = {
                from: 'administration@haku.com',
                to: i.username,
                subject: 'Connecting to Team ✔',
                text: 'You connected to team',
                html: `<h1><a href="${src}">Accept link</a></h1>`
            };
            const res = await transporter.sendMail(mailOptions);
            acceptedTeamCache.set(key, token)
        }
        // console.log(res);
        // return res;
        return true
    }

    static async acceptInviteToProject(key, token) {
        let parsedKey = key.split('$');

        let projectId = parsedKey[0];
        let userId = parsedKey[1];
        let decodedToken = jwt.decode(token, 'jwt');

        if (projectId == decodedToken.projectId && userId == decodedToken.userId) {
            console.log('User verified');
            // try {
            //     const result = await database.Team.update({
            //         accepted: true
            //     }, {
            //         where: {
            //             project: projectId,
            //             user: userId
            //         },
            //         include: [{
            //             all: true
            //         }]
            //     });
            //     return result;
            // } catch (error) {
            //     throw error;
            // }

        } else {
            console.log('Error');
        }
    }


}

export default TeamService;
