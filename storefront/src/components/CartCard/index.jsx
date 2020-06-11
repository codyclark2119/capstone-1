import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Select, MenuItem, IconButton, Typography } from '@material-ui/core';
import { useUserContext } from '../../utils/UserState';
import { EDIT_CART } from '../../utils/actions';
import API from '../../utils/API';

export default function CartCard({ item, removeItem }) {
    const [newQuantity, setNewQuantity] = useState(item.userQuantity);
    const [, dispatch] = useUserContext();

    const handleChange = async (event) => {
        try {         
            let newItem = await API.quantityCheck({ newQuantity: event.target.value, itemId: item.id});
            setNewQuantity(event.target.value)
            if(newItem.status === 200) {
                dispatch({
                    type: EDIT_CART,
                    item: newItem.item
                })
            }
            console.log(newItem.message)
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        return setNewQuantity(item.userQuantity)
    }, [item.userQuantity])

    return (
        <Card>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
                <h3>Remove Item</h3>
                <IconButton style={{ fontSize: 30 }} className="fa fa-minus-circle" color="default" onClick={() => removeItem(item.id)} />
            </Box>
            <CardContent style={{ padding: 0 }}>
                <h2>{item.product_name}</h2>
                <h5>{item.manufacturer}</h5>
                <Box display="flex" style={{ margin: "3%" }} flexDirection="row" justifyContent="space-around">
                    <Select value={newQuantity} onChange={handleChange}>
                        {(item.quantity > 10 && item.userQuantity < 10) ? (
                            [...new Array(10)].map((ele, i) => <MenuItem key={i} value={(i + 1).toString()}>{i + 1}</MenuItem>)
                        ) : (
                                [...new Array(parseInt(item.userQuantity))].map((ele, i) => <MenuItem key={i} value={(i + 1).toString()}>{i + 1}</MenuItem>)
                            )
                        }
                    </Select>
                    <Typography style={{ fontSize: "140%", padding: "0 5%" }} color="primary" component="p">
                        Totaling ${((item.price.split('').slice(1).join('')) * newQuantity).toFixed(2)}
                    </Typography>
                </Box>
            </CardContent>
            <Typography style={{ fontSize: "140%" }} color="primary" component="p">
                In stock:{item.quantity}
            </Typography>

        </Card>
    )
}
