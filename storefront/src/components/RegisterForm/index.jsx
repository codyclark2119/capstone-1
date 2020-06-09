import React, { useRef, useState } from 'react';
import { Container, Box, Button, TextField } from '@material-ui/core';
import { useUserContext } from "../../utils/UserState";
import { CREATE_USER, REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL, LOGIN_USER, LOGOUT } from "../../utils/actions";
import API from '../../utils/API'

export default function RegisterForm() {
    const [{ isAuthenticated }, dispatch] = useUserContext();
    const [isLogin, setIsLogin] = useState(true)
    const [isErr, setIsErr] = useState(false)
    const emailRef = useRef();
    const passRef = useRef();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            const userData = {
                email: emailRef.current.value,
                password: passRef.current.value
            }
            const status = await API.register(userData);
            console.log(status)
            if (status.status === 400) {
                setIsErr(true)
                dispatch({
                    type: REGISTER_FAIL
                })
                emailRef.current.value = "";
                passRef.current.value = "";
            }
            if (isErr) { setIsErr(false) };
            dispatch({
                type: CREATE_USER,
                token: status.token
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const userData = {
                email: emailRef.current.value,
                password: passRef.current.value
            }
            const { status, token } = await API.login(userData);
            switch (status) {
                case 404:
                    setIsErr(true)
                    dispatch({
                        type: LOGIN_FAIL
                    })
                    emailRef.current.value = "";
                    passRef.current.value = "";
                    break;
                case 401:
                    setIsErr(true)
                    dispatch({
                        type: AUTH_ERROR
                    })
                    emailRef.current.value = "";
                    passRef.current.value = "";
                    break;
                default:
                    if (isErr) { setIsErr(false) };
                    dispatch({
                        type: LOGIN_USER,
                        token: token
                    })
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    const changeType = () => {
        setIsLogin(!isLogin)
    }

    return (
        <>
            {isAuthenticated ?
                <Container>
                    <Box display="flex" flexDirection="column">
                        <Button color="primary" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Container>
                :
                <Container>
                    {isLogin ?
                        (<form>
                            <Box display="flex" flexDirection="column">
                                <TextField error={isErr} fullWidth={true} inputRef={emailRef} id="regEmail" label="Email" />
                                <TextField error={isErr} fullWidth={true} inputRef={passRef} id="regPassword" label="Password" />
                                <Button variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
                                <Button onClick={changeType}>Create new user</Button>
                            </Box>
                        </form>) :
                        (<form >
                            <Box display="flex" flexDirection="column">
                                <TextField error={isErr} fullWidth={true} inputRef={emailRef} id="regEmail" label="Email" />
                                <TextField error={isErr} fullWidth={true} inputRef={passRef} id="regPassword" label="Password" />
                                <Button variant="contained" color="secondary" onClick={handleRegister}>Create User</Button>
                                <Button onClick={changeType}>Go to login</Button>
                            </Box>
                        </form>)
                    }
                </Container>
            }
        </>
    )
}
