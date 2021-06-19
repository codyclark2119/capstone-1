import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
// Creating encyption salt
const salt = await bcrypt.genSalt(13);

export default {
    // Using existing token to get userdata
    loadUser: async () => {
        try {
            let loadedUser;
            // If no token return fail status
            if (localStorage.token == undefined) {
                localStorage.removeItem('token')
                return { status: 401, message: "Unauthorized Token" };
            }
            // Calling out to backend for userdata with their token in the header
            loadedUser = await axios.get('api/auth', {
                headers: {
                    'x-auth-token': localStorage.token
                }
            });
            // If no user found return fail status
            if (!loadedUser) return { status: 401, message: "Unauthorized User" }
            // Otherwise return succesfully found userdata
            return { status: 200, user: { email: loadedUser.email, _id: loadedUser._id, first_name: loadedUser.first_name, last_name: loadedUser.last_name } }
        } catch (error) {
            throw new Error(error)
        }
    },
    // Registering a user in the database
    register: async ({ email, password, first_name, last_name }) => {
        try {
            // If missing any values return a failure
            if (!email || !password || !first_name || !last_name) {
                return { status: 400, message: "Fill out all forms" }
            }
            // Creating an object of the data
            let user = {
                email,
                password,
                first_name,
                last_name
            }
            // Encrypting the password 
            user.password = await bcrypt.hash(password, salt);
            let userToken = await axios.post('api/users', user);
            // If the backend responds with errors from express-validator
            if (userToken.errors) {
                return { status: 400, message: `Invalid: ${userToken.errors.msg}` }
            }
            // Otherwise return succesfully found userdata
            return { status: 200, message: "User Created", userToken }
        } catch (error) {
            throw new Error(error)
        }
    },
    // Logging in a user
    login: async ({ email, password }) => {
        try {
            // If no value found fail
            if (email === "" || password === "") {
                return { status: 400, message: "Fill out all forms" }
            }
            // Creating an object of the data
            let user = {
                email,
                password
            }
            // Encrypting the password before sending
            user.password = await bcrypt.hash(password, salt);
            let userToken = await axios.post('api/users/login', user);
            // If the backend responds with errors from express-validator
            if (userToken.errors) {
                return { status: 400, message: `Invalid: ${userToken.errors.msg}` }
            }
            // Otherwise return succesfully found userdata
            return { status: 200, message: "User Logged In", userToken }
        } catch (error) {
            throw new Error(error)
        }
    },
    // Get items from database
    getItems: async () => {
        // Getting items from the backend
        let itemsList = await axios.get('api/products');
        return itemsList;
    },
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // IN PROGRESS, checks quantity from backend to see if user can add to cart
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    quantityCheck: async ({ itemId, newQuantity, cart }) => {
        try {
            // Get item details from backend
            const selectedItem = await axios.get(`api/products/${itemId}`);
            let cartItem = null;
            // If the user has a cart check if they have the item inside it already
            if (cart) {
                cartItem = await (cart.filter(item => item.id === itemId))[0];
            }
            // If the item is in the cart check that the new quantity is possible
            if (cartItem) {
                let totQuantity = parseInt(newQuantity) + parseInt(cartItem.quantity);
                if (selectedItem.quantity < totQuantity) {
                    return { status: 400, message: "Not enough in stock" }
                }
                return { status: 200, item: { id: itemId, quantity: totQuantity } }
            }
            // Otherwise check if the quantity is valid
            if (selectedItem.quantity < newQuantity) {
                return { status: 400, message: "Not enough in stock" }
            }
            // If valid return the item as a valid amount to add to cart
            return { status: 200, item: { id: itemId, quantity: newQuantity } }
        } catch (error) {
            throw new Error(error)
        }
    },
    getCart: async (cart) => {
        try {
            if (cart.length !== 0) {
                const fullCart = await cart.map(cartItem => {
                    let userItem = (itemsList.filter((item) => {
                        return item.id === cartItem.id
                    }))[0];
                    userItem.userQuantity = cartItem.quantity;
                    return userItem
                });
                return { status: 200, list: fullCart }
            }
            return []
        } catch (error) {
            throw new Error(error)
        }
    },
    sendOrder: async ({ shippingInfo, billingInfo, cardInfo, cart }) => {
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

            if (finalCart.length > 0) {
                const newItemsArr = await (finalCart.map(cartItem => {
                    let userItem = itemsList.filter((item) => {
                        return item.id !== cartItem.id
                    });
                    return userItem
                }))[0];
                localStorage.removeItem('items')
                localStorage.setItem('items', JSON.stringify((newItemsArr.concat(finalCart))))
                ordersList.push(newOrder)
                return { status: 200 }
            }
            return { status: 400, message: "Bad Request" }
        } catch (error) {
            throw new Error(error)
        }
    }
}