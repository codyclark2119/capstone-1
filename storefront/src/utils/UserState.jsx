import React, { createContext, useReducer, useContext } from "react";
import { CREATE_USER, LOGIN_USER, USER_LOADED, DELETE_USER, LOGOUT, AUTH_ERROR, LOGIN_FAIL, REGISTER_FAIL, ADD_TO_CART, REMOVE_CART, EDIT_CART, GET_CART, CLEAR_CART } from "./actions";

// Creating a context and destucturing the provider out
const UserContext = createContext();
const { Provider } = UserContext;

// Function that takes in the current state and an action
const reducer = (state, action) => {
    // Based on the passed type of dispatch run specific cases
    switch (action.type) {
        // On a successful check of user token
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        // On a successful login or creation of user
        case CREATE_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                user: user.user
            };
        // On any unsuccessful auth check or logout
        case DELETE_USER:
        case LOGOUT:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };
        // On a successful quantity check add new items to cart
        case ADD_TO_CART:
            localStorage.removeItem('cart')
            const newToCart = action.item;
            let existingItem = (state.cart.filter(item => item.id === newToCart.id))[0]
            if (existingItem) {
                let newCart = state.cart.filter(item => item.id !== newToCart.id)
                existingItem.quantity = parseInt(existingItem.quantity) + parseInt(newToCart.quantity);
                localStorage.setItem('cart', JSON.stringify([existingItem, ...newCart]))
                return {
                    ...state,
                    cart: [existingItem, ...newCart]
                };
            }
            localStorage.setItem('cart', JSON.stringify([newToCart, ...state.cart]))
            return {
                ...state,
                cart: [newToCart, ...state.cart]
            };
        // Removing an item from the cart
        case REMOVE_CART:
            localStorage.removeItem('cart')
            const removedCart = state.cart.filter(item => item.id !== action.id);
            if (removedCart.length !== 0) {
                localStorage.setItem('cart', JSON.stringify([...removedCart]))
                return {
                    ...state,
                    cart: [...removedCart]
                };
            }
            localStorage.setItem('cart', JSON.stringify([]))
            return {
                ...state,
                cart: []
            }
        // Changing the values from a cart
        case EDIT_CART:
            localStorage.removeItem('cart')
            const editItem = (state.cart.filter(item => item.id === action.item.id))[0];
            editItem.quantity = action.item.quantity;
            const editArr = state.cart.filter(item => item.id !== action.item.id);
            localStorage.setItem('cart', JSON.stringify([editItem, ...editArr]))
            return {
                ...state,
                cart: [editItem, ...editArr]
            }
        // Getting the cart from the backend
        case GET_CART:
            const localCart = JSON.parse(localStorage.getItem('cart'))
            if (localCart) {
                if (localCart.length !== 0) {
                    return {
                        ...state,
                        cart: [...localCart]
                    }
                }
                return {
                    ...state,
                    cart: []
                }
            }
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify([]))
            return {
                ...state,
                cart: []
            }
        // Removing the cart completely
        case CLEAR_CART:
            localStorage.removeItem('cart')
            localStorage.setItem('cart', JSON.stringify([]))
            return {
                ...state,
                cart: []
            }
        default:
            return state;
    }
}

//Function that provides an initial value for state and the props is passing through the child components. 
const UserProvider = ({ value = {}, ...props }) => {

    //The state value is what is being used/tracked to hold values while dispatch is how you edit those values
    const [state, dispatch] = useReducer(reducer, {

        //The object you're passing is what becomes state, anything you pass here is an initial state value
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        cart: [],
    }
    );

    //This component now holds both an instance of the state object and the function dispatch that can change that state. The props are passed so that the child components that are going to use the state values are rendered.
    return <Provider value={[state, dispatch]} {...props} />;
};

// When called provides the state and dispatch functions
const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };