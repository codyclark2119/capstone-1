import React, { useRef, useState } from 'react';
import { Container, Box, Button, TextField } from '@material-ui/core';
import { Alert } from "@material-ui/lab"
import { useUserContext } from "../../utils/UserState";
import { CREATE_USER, REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL, LOGIN_USER, LOGOUT } from "../../utils/actions";
import API from '../../utils/API'

export default function RegisterForm() {
    const [{ isAuthenticated }, dispatch] = useUserContext();
    const [isLogin, setIsLogin] = useState(true)
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState()
    const emailRef = useRef();
    const passRef = useRef();
    const firstRef = useRef();
    const lastRef = useRef();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            const userData = {
                email: emailRef.current.value,
                password: passRef.current.value,
                first_name: firstRef.current.value,
                last_name: lastRef.current.value
            }
            const status = await API.register(userData);
            switch (status.status){
                case 200:
                    if (isErr === true) { setIsErr(false) };
                    emailRef.current.value = "";
                    passRef.current.value = "";
                    firstRef.current.value = "";
                    lastRef.current.value = "";
                    return dispatch({
                        type: CREATE_USER,
                        token: status.token
                    });

                case 400: 
                    setIsErr(true)
                    emailRef.current.value = "";
                    passRef.current.value = "";
                    firstRef.current.value = "";
                    lastRef.current.value = "";
                    return dispatch({
                        type: REGISTER_FAIL
                    });

                default: 
                    break;
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            if (emailRef.current.value && passRef.current.value) {
                const userData = {
                    email: emailRef.current.value,
                    password: passRef.current.value
                }
                const { status, token } = await API.login(userData);
                switch (status) {
                    case 404:
                        setIsErr(true)
                        console.log(status.message)
                        setErrMsg(status.message)
                        dispatch({
                            type: LOGIN_FAIL
                        })
                        emailRef.current.value = "";
                        passRef.current.value = "";
                        break;
                    case 401:
                        setIsErr(true)
                        console.log(status.message)
                        setErrMsg(status.message)
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
                                {isErr ? <Alert severity="error">{errMsg}</Alert> : null}
                                <TextField error={isErr} inputRef={emailRef} id="regEmail" label="Email" />
                                <TextField error={isErr} inputRef={passRef} id="regPassword" label="Password" />
                                <Button style={{ margin: "5%" }} variant="contained" color="secondary" onClick={handleLogin}>Login</Button>
                                <Button style={{ margin: "2%" }} onClick={changeType}>Create new user</Button>
                            </Box>
                        </form>) :
                        (<form >
                            <Box display="flex" flexDirection="column">
                                {isErr ? <Alert severity="error">{errMsg}</Alert> : null}
                                <TextField error={isErr} inputRef={emailRef} id="regEmail" label="Email" />
                                <TextField error={isErr} inputRef={passRef} id="regPassword" label="Password" />
                                <TextField error={isErr} inputRef={firstRef} id="regFirst" label="First Name" />
                                <TextField error={isErr} inputRef={lastRef} id="regLast" label="Last Name" />
                                <Button style={{ margin: "5%" }} variant="contained" color="secondary" onClick={handleRegister}>Create User</Button>
                                <Button style={{ margin: "2%" }} onClick={changeType}>Go to login</Button>
                            </Box>
                        </form>)
                    }
                </Container>
            }
        </>
    )
}
