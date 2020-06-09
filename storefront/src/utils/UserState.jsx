import React, { createContext, useReducer, useContext } from "react";
import { CREATE_USER, LOGIN_USER, USER_LOADED, DELETE_USER, LOGOUT, AUTH_ERROR, LOGIN_FAIL, REGISTER_FAIL } from "./actions";
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
            let user = API.loadUser()
            return {
                ...state,
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                user: {email: user.email, _id: user._id, first_name: user.first_name, last_name: user.last_name }
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
        default:
            return state;
    }
}

const UserProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
            token: localStorage.getItem('token'),
            isAuthenticated: null,
            user: null
        }
    );

    return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };