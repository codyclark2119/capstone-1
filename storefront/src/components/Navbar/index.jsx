import React, { useState, useEffect } from 'react'
import { Container, Box, Button, Popover, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { useUserContext } from '../../utils/UserState';
import { USER_LOADED, AUTH_ERROR } from '../../utils/actions';
import API from '../../utils/API';
import RegisterForm from '../RegisterForm';

export default function Navbar() {
    const [state, dispatch] = useUserContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    useEffect(() => {
        if (localStorage.token === "undefined") {
            localStorage.removeItem('token')
        }
        const user = API.loadUser();
        if (user.status !== 401) {
            setAnchorEl(null);
            dispatch({
                type: USER_LOADED,
                user: user.user
            })
        } else {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }, []);
    return (
        <div>
            <AppBar position="static">
                <Box display="flex" flexDirection="space-equally" justifyContent="flex-end">
                    <IconButton  color="inherit" aria-label="home" className="fas fa-store-alt" href="/" />
                    {state.user ? (
                        <Toolbar>
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                {`Welcome ${state.user.first_name} ${state.user.last_name}`}
                            </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                elevation={3}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Container>
                                    <RegisterForm />
                                </Container>
                            </Popover>
                        </Toolbar>
                    ) :
                        <Toolbar>
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                Login/Signup
                        </Button>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                elevation={3}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}

                            >
                                <Container>
                                    <RegisterForm />
                                </Container>
                            </Popover>
                        </Toolbar>}
                </Box>
            </AppBar>

        </div>
    )
}
