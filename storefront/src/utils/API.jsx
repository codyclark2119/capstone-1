import userData from '../data/userSchema';
import itemData from '../data/itemSchema';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const users = userData.map(user => { return user })
const items = itemData.map(item => { return item })

export default {
    loadUser: () => {
        try {
            let decoded;
            let user;
            if (localStorage.token) {
                decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWTSecret);
                user = users.find(user => user._id === decoded.id);
            }
            if (!user) { return null }
            return { email: user.email, _id: user._id, first_name: user.first_name, last_name: user.last_name }
        } catch (err) {
            console.error(err)
        }
    },
    callUsers: () => {
        return console.log(users);
    },
    register: async ({ email, password, first_name, last_name }) => {
        try {
            if (!email || !password || !first_name || !last_name) {
                return { status: 400, message: "Fill out all forms" }
            }
            let user = await users.find(user => user.email === email)
            if (user) {
                return { status: 400, message: "User already exists" }
            }
            user = {
                _id: uuidv4(),
                email,
                password,
                first_name,
                last_name
            }
            const salt = await bcrypt.genSalt(13);
            user.password = await bcrypt.hash(password, salt);
            users.push(user)
            const payload = {
                id: user._id
            };
            const token = jwt.sign(
                payload,
                process.env.REACT_APP_JWTSecret,
                { expiresIn: '7d' }
            );
            return { status: 200, message: "User Created", token }
        } catch (error) {
            return error;
        }
    },
    login: async ({ email, password }) => {
        try {
            if (!email || !password) {
                return { status: 400, message: "Fill out all forms" }
            }
            let user = users.find(user => user.email === email)
            if (!user) {
                return { status: 404, message: "User doesn't exists" }
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { status: 401, message: "Incorrect Login Attempt" }
            }
            const payload = {
                id: user._id
            };
            const token = jwt.sign(
                payload,
                process.env.REACT_APP_JWTSecret,
                { expiresIn: '7d' }
            );
            return { status: 200, message: "User Logged In", token }
        } catch (error) {
            console.error(error)
        }
    },
    getItems: () => {
        return items;
    }
}