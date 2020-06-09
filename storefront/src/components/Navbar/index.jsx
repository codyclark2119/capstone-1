import React, { useState, useEffect } from 'react'
import { Container, Box, Button, Popover, AppBar, Toolbar } from '@material-ui/core'
import { useUserContext } from '../../utils/UserState';
import { USER_LOADED, AUTH_ERROR } from '../../utils/actions';
import API from '../../utils/API';
import RegisterForm from '../RegisterForm';

export default function Navbar() {
    const [{ isAuthenticated, user }, dispatch] = useUserContext();
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
        if (localStorage.token) {
            const user = API.loadUser();
            if (user) {
                setAnchorEl(null);
                dispatch({
                    type: USER_LOADED,
                    user
                })
            } else {
                dispatch({
                    type: AUTH_ERROR
                })
            }
        }
    }, []);
    return (
        <div>
            <AppBar position="static">
                <Box display="flex" flexDirection="row-reverse">
                    {isAuthenticated ? (
                        <Toolbar>
                            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                                {`Welcome ${user.first_name} ${user.last_name}`}
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
