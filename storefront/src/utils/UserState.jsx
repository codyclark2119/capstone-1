import React, { createContext, useReducer, useContext } from "react";
import { CREATE_USER, LOGIN_USER, USER_LOADED, DELETE_USER, LOGOUT, AUTH_ERROR, LOGIN_FAIL, REGISTER_FAIL, ADD_TO_CART, REMOVE_CART, EDIT_CART, GET_CART, CLEAR_CART } from "./actions";
import API from "./API";

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user
            };
        case CREATE_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.token);
            let user = API.loadUser();
            console.log(user)
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                user: user.user
            };
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
        case ADD_TO_CART:
            localStorage.removeItem('cart')
            const newToCart = action.item;
            let existingItem = (state.cart.filter(item => item.id === newToCart.id))[0]
            if(existingItem){
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
        case GET_CART:
            const localCart = JSON.parse(localStorage.getItem('cart'))
            if(localCart){                
                if(localCart.length !== 0){
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
            case CLEAR_CART:
                localStorage.removeItem('cart')
                localStorage.setItem('cart', JSON.stringify([]))
                return{
                    ...state,
                    cart: []
                }
        default:
            return state;
    }
}

const UserProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            user: null,
            cart: [],
        }
    );

    return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };