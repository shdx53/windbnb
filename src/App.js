import React, { useState } from "react"
import Header from "./components/Header"
import Stays from "./components/Stays"
import Search from "./components/Search"
import useMatchedLocationsSetter from "./hooks/useMatchedLocationsSetter"
import "./style.css"

export default function App() {
  const [isDisplay, setIsDisplay] = useState(false)
  const [searchData, setSearchData] = useState({
    location: "",
    adultCount: "",
    childrenCount: ""
  })
  const [searchResults, setSearchResults] = useState(null)
  const matchedLocations = useMatchedLocationsSetter(searchData)
  
  function toggleDisplay(event) {
    event.preventDefault()
    if (
      !isDisplay ||
      event.target.name === "search" ||
      event.target.name === "close" ||
      event.type === "submit"
    ) {
      setIsDisplay(prev => !prev)
    }
  }

  const displayEl = 
    <>
      {
        isDisplay ?
          <Search 
          toggleDisplay={toggleDisplay} 
          searchData={searchData}
          setSearchData={setSearchData}
          setSearchResults={setSearchResults}
          matchedLocations={matchedLocations}
          /> :
          <Header toggleDisplay={toggleDisplay} searchData={searchData}/>
      }
      {
        searchResults ?
          <Stays searchResults={searchResults}/> : <Stays />
      }
    </>
  
  return (
    <>
      {displayEl}
    </>
  )
}