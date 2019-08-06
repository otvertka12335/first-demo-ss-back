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
            from: 'Nodemailer <administration@haku.com>',
            to: user.username,
            subject: 'Activation account ✔',
            text: '',
            html:
                `
            <html>
<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Transactional Email</title>
    <style>
        /* -------------------------------------
            INLINED WITH htmlemail.io/inline
        ------------------------------------- */
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
            table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
                font-size: 16px !important;
            }
            table[class=body] .wrapper,
            table[class=body] .article {
                padding: 10px !important;
            }
            table[class=body] .content {
                padding: 0 !important;
            }
            table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
            }
            table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
            }
            table[class=body] .btn table {
                width: 100% !important;
            }
            table[class=body] .btn a {
                width: 100% !important;
            }
            table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
            }
        }
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
            .ExternalClass {
                width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%;
            }
            .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important;
            }
            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }
            .btn-primary table td:hover {
                background-color: #34495e !important;
            }
            .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important;
            }
        }
    </style>
</head>
<body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
    <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p>
                                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                            <tbody>
                                            <tr>
                                                <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                        <tbody>
                                                        <tr>
                                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="${src}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Confirm Registration</a> </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Good luck! Hope it works.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- END MAIN CONTENT AREA -->
                </table>

                <!-- END CENTERED WHITE CONTAINER -->
            </div>
        </td>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    </tr>
</table>
</body>
</html>
            `
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
