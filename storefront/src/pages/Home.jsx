import React, { useEffect, useState, useRef } from 'react'
import API from '../utils/API.jsx';
import { useUserContext } from '../utils/UserState';
import { Container, Grid, Button, Input, IconButton } from '@material-ui/core';
import { GET_CART } from '../utils/actions'
import CartFooter from '../components/CartFooter'
import ItemCard from '../components/ItemCard';

export default function Home() {
  // Only pulling out the dispatch function from userContext
  const [, dispatch] = useUserContext();
  const [page, setPage] = useState(0)
  const [originalList, setOriginalList] = useState()
  const [items, setItems] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const userSearch = useRef()

  // Search looking though all item properties
  const itemSearch = () => {
    // Creating a Regex using the current value of the search box
    let searchReg = new RegExp(`(${userSearch.current.value})`, 'gi');
    const matchedItems = originalList.filter(item => {
      // Creating an array of the item object values
      const itemVals = Object.values(item)
      // Checking if any of the values of item object matches
      const isMatch = itemVals.filter(val => val.toString().match(searchReg))
      // If no matches return an empty value otherwise return the item
      if (isMatch.length === 0) {
        return null;
      }
      return item;
    })
    // Setting 'isSearched' to true for the search button to turn into a reset button
    setIsSearched(true)
    // Setting the item list rendered to the items matched in search
    return setItems(matchedItems);
  }

  // Resetting the search
  const listReset = () => {
    setIsSearched(false)
    return setItems(originalList);
  }

  // Controls which items are rendered on the page
  const nextPage = () => {
    let filterList = originalList.filter(item => ((item.id >= ((page + 1) * 30) && (item.id <= ((page + 2) * 30) - 1))))
    if (filterList.length > 0) {
      setPage(page + 1)
      setItems(filterList);
    }
    userSearch.current.focus()
  }

  // Controls which items are rendered on the page
  const lastPage = () => {
    let filterList = originalList.filter(item => ((item.id >= ((page - 1) * 30) - 1 && (item.id <= ((page) * 30)))))
    if (filterList.length > 0) {
      setPage(page - 1)
      setItems(filterList);
    }
    userSearch.current.focus()
  }

  useEffect(() => {
    // Getting the item list from the backend on page load
    let itemList = API.getItems();
    // Running a state update to get the user cart
    dispatch({
      type: GET_CART
    })
    // Getting the inital first page items seperated from the main list
    let filterList = itemList.filter(item => item.id <= (page + 1 * 30))
    setItems(filterList)
    setOriginalList(itemList);
    return
  }, [])

  return (
    <>
      <Container>
        <Input style={{ minWidth: "30%", maxWidth: "60%", margin: "3% 5%", fontSize: "150%" }} color="primary" inputRef={userSearch} />
        <Button color="secondary" variant="contained" onClick={isSearched ? listReset : itemSearch} >{isSearched ? "Reset" : "Search"}</Button>
        <Grid container justify="center" spacing={4}>
          {items.map((item) => {
            return <Grid item xs={10} sm={5} lg={4} key={item.id}>
              <ItemCard item={item} />
            </Grid>
          })}
          <Grid item xs={12} style={{ padding: "2% 0 13% 0" }}>
            <IconButton className="fas fa-arrow-left" color="secondary" onClick={lastPage} />
            <IconButton className="fas fa-arrow-right" color="secondary" onClick={nextPage} />
          </Grid>
        </Grid>
      </Container>
      <CartFooter />
    </>
  )
}
