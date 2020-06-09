import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../utils/UserState';
import { USER_LOADED, AUTH_ERROR } from '../utils/actions';
import API from '../utils/API.jsx';
import { Container, Box, Grid, Button, Input, Card, Avatar, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import ItemCard from '../components/ItemCard';

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
  const [originalList, setOriginalList] = useState()
  const [items, setItems] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const classes = useStyles();
  const userSearch = useRef()

  const itemSearch = () => {
    let searchReg = new RegExp(`(${userSearch.current.value})`, 'gi');
    const matchedItems = originalList.filter(item => {
      const itemVals = Object.values(item)
      const isMatch = itemVals.filter(val => val.toString().match(searchReg))
      if (isMatch.length === 0) {
        return null;
      }
      return item;
    })
    console.log(matchedItems)
    setIsSearched(true)
    return setItems(matchedItems);
  }

  const listReset = () => {
    setIsSearched(false)
    return setItems(originalList);
  }

  useEffect(() => {
    const itemList = API.getItems();
    console.log(itemList)
    setItems(itemList)
    return setOriginalList(itemList);
  }, [])
  return (
    <Container>
      <Input autoFocus={true} color="primary" inputRef={userSearch} />
      <Button color="secondary" variant="contained" onClick={isSearched ? listReset : itemSearch} >{isSearched ? "Reset" : "Search"}</Button>
      <Grid container justify="center" spacing={3}>
        {items.map((item) => {
          return <Grid item xs={10} sm={5} lg={4} key={item.id}>
            <ItemCard item={item} />
          </Grid>
        })}
      </Grid>
    </Container>
  )
}
