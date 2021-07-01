import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DataProvider } from './utils/GlobalState';
import Home from './pages/Home';
import Order from './pages/Order';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import API from './utils/API';

function App() {
  const [originalList, setOriginalList] = useState([])
  const [items, setItems] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // Search looking though all item properties
  const itemSearch = (userSearch) => {
    // Creating a Regex using the current value of the search box
    let searchReg = new RegExp(`(${userSearch})`, 'gi');
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

  useEffect(() => {
    async function getItems(){
      const itemList = await API.getItems(0,40);
      setOriginalList(itemList)
      setItems(itemList)
    }
    getItems();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* User Provider for the User State */}
        <DataProvider>
          <Navbar isSearched={isSearched} listReset={listReset} itemSearch={itemSearch} />
          <Switch>
            <Route exact path="/" ><Home items={items}/></Route>
            <Route exact path="/order"><Order/></Route>
            <Route exact path="/profile"><Profile/></Route>
          </Switch>
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
