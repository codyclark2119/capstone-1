import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, IconButton, Divider, Typography, Toolbar, AppBar, Drawer, Button } from "@material-ui/core";
import CartCard from '../CartCard';
import { useUserContext } from '../../utils/UserState';
import { REMOVE_CART } from '../../utils/actions';
import API from '../../utils/API';
import RegisterForm from "../RegisterForm";

const drawerHeight = "100%";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        top: "auto",
        bottom: 0,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    toolBar: {
        display: "flex",
        justifyContent: "center"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: 'secondary'
    },
    hide: {
        display: "none"
    },
    drawer: {
        height: drawerHeight,
        flexShrink: 0
    },
    drawerPaper: {
        height: drawerHeight
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 2),
        justifyContent: "space-between",
        alignText: "center"
    }
}));

export default function CartFooter() {
    const classes = useStyles();
    const [state, dispatch] = useUserContext();
    const [total, setTotal] = useState(0)
    const [open, setOpen] = useState(false);
    const [userCart, setUserCart] = useState([])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const removeItem = async (removedId) => {
        const newCart = await userCart.filter(item => item.id !== removedId)
        setUserCart(newCart)
        if (newCart.length === 0) {
            setTotal(0)
        }
        dispatch({
            type: REMOVE_CART,
            id: removedId
        })
    }

    useEffect(() => {
        async function getCart() {
            if ((state.cart)) {
                const cart = await API.getCart(state.cart)
                if (cart.status === 200) {
                    let costArr = await cart.list.map(item => {
                        let itemPrice = item.price.split('').slice(1).join('') * item.userQuantity;
                        return itemPrice;
                    })
                    if (costArr.length !== 0) {
                        setTotal((costArr.reduce((total, num) => total + num).toFixed(2)))
                    }
                    setUserCart(cart.list)
                }
            }
        };
        getCart();
    }, [state.cart])

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={open ? (classes.appBar, classes.hide) : classes.appBar}
                onClick={handleDrawerOpen}
            >
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className={open ? (classes.menuButton, 'fas fa-shopping-cart', classes.hide) : (classes.menuButton, 'fas fa-shopping-cart')}
                    >
                        <Typography variant="h6" noWrap>
                            Cart ${total}
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="bottom"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <h3>Cart Total: ${total}</h3>
                    <IconButton color="primary" onClick={handleDrawerClose}>
                        X
                    </IconButton>
                </div>
                <Divider />
                <Grid id="cartContainer" container justify="space-around" >
                    <Grid item xs={12} md={8}>
                        {state.user ? (
                            <Box display="flex" justifyContent="space-evenly" flexWrap="wrap">
                                <h1 className={classes.drawerHeader}>Thank you {state.user.first_name}, for shopping with us!</h1>
                                <Grid container justifyContent="center" flexWrap="wrap" alignItems="stretch">
                                    <Grid item xs={12}>
                                        <Typography variant="h4" noWrap>
                                            Cart Total ${total}
                                        </Typography>
                                        <Button href="/order" variant="contained" color="secondary" style={{ fontSize: "80%", width: "35%" }}>Checkout</Button>
                                    </Grid>
                                </Grid>
                            </Box>)
                            : (
                                <Box display="flex" justifyContent='space-evenly' flexWrap="wrap">
                                    <h1 className={classes.drawerHeader}>Thank you Guest, for shopping with us!</h1>
                                    <Grid container justifyContent="space-evenly" flexWrap="wrap" alignItems="stretch">
                                        <Grid item xs={12} sm={7} md={6} >
                                            <h4>If you'd like to checkout as a user: </h4>
                                            <RegisterForm />
                                        </Grid>
                                        <Grid item xs={12} sm={5} md={6} >
                                            <Typography variant="h4" noWrap>
                                                Cart Total ${total}
                                            </Typography>
                                            <Button href="/order" variant="contained" color="secondary" style={{ fontSize: "80%", width: "35%" }}>Checkout</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            )}
                    </Grid>
                    <Grid item xs={12}>
                        <h1 >Your Cart:</h1>
                        <div style={{ overflowY: "scroll", overflowX: "hidden", maxHeight: "500px", margin: "0 10%" }}>
                            <Grid container justify="center" spacing={4} >
                                {(userCart.length !== 0) ? userCart.map((item) => {
                                    return (<Grid item xs={12} md={6} key={item.id}>
                                        <CartCard item={item} removeItem={removeItem} />
                                    </Grid>)
                                }) : <h1>No Cart to display!</h1>}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Drawer>
        </div>
    );
}
