import React, { useEffect, useState, useRef } from 'react'
import { useGlobalContext } from '../utils/GlobalState';
import API from "../utils/API.js"
import ItemCard from '../components/ItemCard';
import Navbar from '../components/Navbar'

export default function Home({ items }) {
  // Only pulling out the dispatch function from userContext
  const [, dispatch] = useGlobalContext();

  return (
    <>
      <div className="container-fluid row">
        {items.length !== 0 ? items.map(item => { return <ItemCard item={item} key={item.serial_number} />}) : (<div className="container-fluid spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>)}
      </div>
    </>
  )
}
