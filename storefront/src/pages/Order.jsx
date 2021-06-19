import React, { useState, useEffect } from 'react'
import { useUserContext } from '../utils/UserState';
import { REMOVE_CART, GET_CART, CLEAR_CART } from '../utils/actions';
import { Button, Grid, TextField, Switch, Typography } from '@material-ui/core';
import API from '../utils/API';
import CartCard from '../components/CartCard';

export default function Order() {
    const [state, dispatch] = useUserContext();
    const [isSame, setIsSame] = useState(true);
    const [isErr, setIsErr] = useState(false)
    const [total, setTotal] = useState(0)
    const [userCart, setUserCart] = useState([])
    const [shippingInfo, setShippingInfo] = useState({
        first_name: "",
        last_name: "",
        street_address: "",
        street_address_2: "",
        city: "",
        state: "",
        zip: ""
    })
    const [billingInfo, setBillingInfo] = useState({
        first_name: "",
        last_name: "",
        address: "",
        address_2: "",
        city: "",
        state: "",
    })
    const [cardInfo, setCardInfo] = useState({
        billing_zip: "",
        card_number: "",
        card_cvv: ""
    })

    const handleShippingChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value })
    }

    const handleBillingChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value, })
    }

    const handleCardChange = (e) => {
        setCardInfo({ ...cardInfo, [e.target.name]: e.target.value })
    }

    const handleSame = () => {
        setIsSame(!isSame)
    }

    const handleSubmit = async () => {
        try {            
            if (isSame) {
                let response = await API.sendOrder({ shippingInfo, billingInfo: shippingInfo, cardInfo, cart: userCart })
                if (response.status === 200) {
                    dispatch({
                        type: CLEAR_CART
                    })
                    window.location.replace('/')
                } else {
                    setIsErr(true)
                }
            }
            else {
                let response = await API.sendOrder({ shippingInfo, billingInfo, cardInfo, cart: userCart })
                if (response.status === 200) {
                    dispatch({
                        type: CLEAR_CART
                    })
                    window.location.replace('/')
                } else {
                    setIsErr(true)
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

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
            const cart = await API.getCart(state.cart)
            if (cart.list) {
                let costArr = await cart.list.map(item => {
                    let itemPrice = item.price.split('').slice(1).join('') * item.userQuantity;
                    return itemPrice;
                })
                if (costArr.length !== 0) {
                    setTotal((costArr.reduce((total, num) => total + num).toFixed(2)))
                }
                setUserCart(cart.list)
                return dispatch({
                    type: GET_CART
                })
            };
            return dispatch({
                type: GET_CART
            })
        }
        getCart();
    }, [state.cart.length])

    return (

        <Grid container style={{ margin: "2%", overflow: "hidden" }}>
            <Grid container item xs={12} md={6} justify="center">
                <Typography variant="h4">
                    Enter your shipping address
            </Typography>
                <Grid container spacing={3} item xs={10}  >
                    {Object.keys(shippingInfo).map((req, i) =>
                        <Grid item xs={12} sm={6} lg={4} key={i}>
                            <TextField fullWidth={true} name={req} onChange={handleShippingChange} label={req.split('_').join(' ').toUpperCase()} />
                        </Grid>
                    )}
                    <Grid item xs={12} color="primary">
                        <Typography variant="h4">
                            Is your shipping the same as your billing?
                                </Typography>
                        <Switch
                            checked={isSame}
                            onChange={handleSame}
                            name="isSame"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} item xs={10} >
                    {!isSame ? (<>
                        <Grid item xs={12} sm={6} lg={4} >
                            <TextField fullWidth={true} error={isErr} name="card_number" onChange={handleCardChange} label="CARD NUMBER" />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} >
                            <TextField fullWidth={true} error={isErr} name="card_cvv" onChange={handleCardChange} label="CARD CVV" />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} >
                            <TextField fullWidth={true} error={isErr} name="billing_zip" onChange={handleCardChange} label="BILLING ZIP" />
                        </Grid>
                        {Object.keys(billingInfo).map((req, i) => {
                            return (<Grid item xs={12} sm={6} lg={4} key={i}>
                                <TextField error={isErr} fullWidth={true} name={req} onChange={handleBillingChange} label={req.split('_').join(' ').toUpperCase()} />
                            </Grid>)
                        })}
                    </>
                    ) : (
                            <>
                                <Grid item xs={12} sm={6} lg={4} >
                                    <TextField error={isErr} fullWidth={true} name="billing_zip" onChange={handleBillingChange} label="BILLING ZIP" />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={4} >
                                    <TextField error={isErr} fullWidth={true} name="card_number" onChange={handleBillingChange} label="CARD NUMBER" />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={4} >
                                    <TextField error={isErr} fullWidth={true} name="card_cvv" onChange={handleBillingChange} label="CARD CVV" />
                                </Grid>
                            </>
                        )}
                    <Grid item xs={12}><Button style={{ fontSize: "110%", maxWidth: "100%" }} variant="contained" onClick={handleSubmit} color="secondary">Finish order</Button></Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} md={5} justify="center">
                <Grid item xs={10}>
                    <h1 >Your Cart:</h1>
                    <Grid item xs={12}>
                        <Typography variant="h4" noWrap>
                            Cart Total ${total}
                        </Typography>
                    </Grid>
                    <div style={{ overflowY: "scroll", overflowX: "hidden", height: "650px" }}>
                        <Grid container justify="center" spacing={2} >
                            {(userCart) ? userCart.map((item) => {
                                return (<Grid item xs={12} key={item.id}>
                                    <CartCard item={item} removeItem={removeItem} />
                                </Grid>)
                            }) : <h1>No Cart to display!</h1>}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    )
}
