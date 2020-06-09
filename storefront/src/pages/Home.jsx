import React, { useEffect, useState } from 'react'
import { useUserContext } from '../utils/UserState';
import { USER_LOADED, AUTH_ERROR } from '../utils/actions';
import API from '../utils/API.jsx';
import { Container, Box, Grid, Card, Avatar, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
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
    marginTop: "-10%",
    fontSize: "145%",
  },
}));

export default function Home() {
  const [state, dispatch] = useUserContext();
  const [items, setItems] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const itemList = API.getItems();
    console.log(itemList)
    return setItems(itemList);
  }, [])
  return (
    <Container>
      <Grid container justify="center" spacing={3}>
        {items.map((item) => {
          return <Grid item xs={10} sm={5} lg={4} key={item.id}>
            <Card>
              <CardHeader avatar={
                <Avatar className={classes.avatar}>
                  {item.manufacturer.split('')[0]}
                </Avatar>}
                title={item.manufacturer}
              />
              <CardMedia
                className={classes.media}
                image={'https://via.placeholder.com/150'}
                title="Paella dish"
              />
              <Box display="flex" justifyContent="flex-end">
                <CardActions>
                  <IconButton style={{ fontSize: 50, marginTop: "-62%" }} className="fa fa-plus-circle" color="secondary" />
                </CardActions>
              </Box>
              <CardContent>
                <Typography className={classes.cardHeader} color="primary" component="p">
                  {item.product_name} for {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        })}
      </Grid>
    </Container>
  )
}
