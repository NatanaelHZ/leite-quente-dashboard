const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config();

module.exports = class UserService {

    static async getAllUsers() {
        try {
            const allUsers = await User.findAll();

            return allUsers;
        } catch (error) {
            console.log(`Could not fetch Users ${error}`)
        }
    }

    static async createUser(data) {
        try {/*

            const newUser = {
                title: data.title,
                body: data.body,
                User_image: data.User_image
            }
           const response = await new User(newUser).save();
           return response;*/
        } catch (error) {
            console.log(error);
        }
    }

    static async registerUser(data) {
        try {
            const { email } = data;

            const user = await User.create(data);

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            return user;
        } catch (err) {
            console.log(err);
        }
    }

    static async getUserbyId(UserId) {
        try {
            const singleUser = await User.findByPk(UserId);

            return singleUser;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async updateUser(data) {
        try {/*
            const { id, name, email, password } = data;

            const updateUser = await User.findByPk(id);

            updateUser.name = name;
            updateUser.email = email;
            updateUser.password = password;

            updateUser.save();*/

            const userId = data.id;
            console.log(userId);
            const user = {
                name: data.name,
                email: data.name,
                password: data.name,
            };

            updateUser = await User.update(user, { where: { id: userId } });

            return updateUser;
        } catch (error) {
            console.log(`Could  ot delete User ${error}`);
        }
    }

    static async deleteUser(UserId) {
        try {
            const deletedUser = await User.destroy({ where: { id: UserId } });

            return deletedUser;
        } catch (error) {
            console.log(`Could  ot delete User ${error}`);
        }
    }
}
