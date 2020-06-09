import React, {useState} from 'react'
import { Box, Card, Avatar, CardHeader, CardMedia, CardContent, CardActions, Select, MenuItem, IconButton, Typography, makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: blueGrey[500],
    },
    cardHeader: {
      margin: "-5% 0 5% 0",
      fontSize: "100%",
    },
  }));
export default function ItemCard({item}) {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        console.log(quantity, item.id)
    }
    const handleChange = (event) => {
        setQuantity(event.target.value)
    }
    return (
        <Card>
            <CardHeader avatar={
                <Avatar className={classes.avatar}>
                    {item.manufacturer.split('')[0]}
                </Avatar>}
                title={item.product_name}
                subheader={`by ${item.manufacturer}`}
            />
            <CardMedia
                className={classes.media}
                image={'https://via.placeholder.com/150'}
                title="Item Placeholder"
            />
            <Box display="flex" justifyContent="flex-end">
                <CardActions>
                    <IconButton style={{ fontSize: 50, marginTop: "-62%" }} className="fa fa-plus-circle" color="secondary" onClick={addToCart}/>
                </CardActions>
            </Box>
            <CardContent>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">

                <Select value={quantity} onChange={handleChange}>
                    {[...new Array(20)].map((ele, i)=> <MenuItem key={i} value={(i + 1).toString()}>{i + 1}</MenuItem>)}
                </Select>
                <Typography className={classes.cardHeader} color="primary" component="p">
                   Totaling ${((item.price.split('').slice(1).join('')) * quantity).toFixed(2)}
                </Typography>
            </Box>

            </CardContent>
            <CardActions>                
                <Typography className={classes.cardHeader} color="primary" component="p">
                    In stock:{item.quantity}
                </Typography>
            </CardActions> 
        </Card>
    )
}
