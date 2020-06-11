import userData from '../data/userSchema';
import itemData from '../data/itemSchema';
import orderData from '../data/orderSchema'
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

if(!localStorage.users || !localStorage.items || !localStorage.orders ){
    localStorage.setItem('users',JSON.stringify(userData))
    localStorage.setItem('items',JSON.stringify(itemData))
    localStorage.setItem('orders',JSON.stringify(orderData))
}

let usersList = JSON.parse(localStorage.getItem('users'));
let itemsList = JSON.parse(localStorage.getItem('items'));
let ordersList = JSON.parse(localStorage.getItem('orders'));

export default {
    loadUser: () => {
        try {
            let decoded;
            let loadedUser;
            if (localStorage.token == undefined) {
                localStorage.removeItem('token')
                return {status: 401, message: "Unauthorized Token"};
            } 
            decoded = jwt.verify(localStorage.token, process.env.REACT_APP_JWTSecret);
            loadedUser = usersList.find(user => user._id === decoded.id);
            if (!loadedUser) return {status: 401, message: "Unauthorized User"}
            return { status: 200, user: {email: loadedUser.email, _id: loadedUser._id, first_name: loadedUser.first_name, last_name: loadedUser.last_name} }
            
        } catch (error) {
            throw new Error(error)
        }
    },
    register: async ({ email, password, first_name, last_name }) => {
        try {
            if (!email || !password || !first_name || !last_name) {
                return { status: 400, message: "Fill out all forms" }
            }
            let user = await usersList.find(user => user.email === email)
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
            const payload = {
                id: user._id
            };
            const token = await jwt.sign(
                payload,
                process.env.REACT_APP_JWTSecret,
                { expiresIn: '7d' }
                );
            usersList.push(user)
            return { status: 200, message: "User Created", token }
        } catch (error) {
            throw new Error(error)
        }
    },
    login: async ({ email, password }) => {
        try {
            if (email === "" || password === "") {
                return { status: 400, message: "Fill out all forms" }
            }
            let user = usersList.find(user => user.email === email)
            if (!user) {
                return { status: 404, message: "User doesn't exist" }
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { status: 401, message: "Incorrect Login Attempt" }
            }
            const payload = {
                id: user._id
            };
            const token = await jwt.sign(
                payload,
                process.env.REACT_APP_JWTSecret,
                { expiresIn: '7d' }
            );
            return { status: 200, message: "User Logged In", token }
        } catch (error) {
            throw new Error(error)
        }
    },
    getItems: () => {
        return itemsList;
    },
    quantityCheck: async ({itemId, newQuantity, cart}) => {
        try {            
            const selectedItem = await (itemsList.filter(item => item.id === itemId))[0]
            let cartItem = null;
            if(cart){
                cartItem = await (cart.filter(item => item.id === itemId))[0]
            }
            if(cartItem){                
                if (selectedItem.quantity < (parseInt(newQuantity) + parseInt(cartItem.quantity))){
                    return {status: 400, message: "Not enough in stock"}
                }
            }
            if (selectedItem.quantity < newQuantity){
                return {status: 400, message: "Not enough in stock"}
            }
            return {status: 200, item: {id:itemId, quantity: newQuantity}}
        } catch (error) {
            throw new Error(error)
        }
    },
    getCart: async (userCart) => {
        try {            
            if(userCart.length !== 0){
                const fullCart = await userCart.map(cartItem => {
                    let userItem = (itemsList.filter((item) => {
                        return item.id === cartItem.id
                    }))[0];
                    userItem.userQuantity = cartItem.quantity;
                    return userItem
                });
                return {status: 200, list:fullCart}
            }
            return []
        } catch (error) {
            throw new Error(error)
        }
    },
    sendOrder: async ({shippingInfo, billingInfo, cardInfo, cart}) => {
        try {            
            const newOrder = {
                id: uuidv4(),
                shippingInfo,
                billingInfo,
                cardInfo,
                cart
            }   
            
            const finalCart = await cart.map(cartItem => {
                let userItem = (itemsList.filter((item) => {
                    return item.id === cartItem.id
                }))[0];
                userItem.quantity = (parseInt(userItem.quantity) - parseInt(cartItem.userQuantity));
                return userItem
            });

            if (finalCart.length > 0){
                const newItemsArr = await (finalCart.map(cartItem => {
                    let userItem = itemsList.filter((item) => {
                        return item.id !== cartItem.id
                    });
                    return userItem
                }))[0];
                localStorage.removeItem('items')
                localStorage.setItem('items', JSON.stringify((newItemsArr.concat(finalCart))))
                ordersList.push(newOrder)
                return {status: 200}
            }
            return {status: 400, message: "Bad Request"}
        } catch (error) {
            throw new Error(error)
        }
    }
}