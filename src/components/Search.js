import React, { useState, useRef } from "react"
import { nanoid } from "nanoid"
import MatchedLocation from "./MatchedLocation"
import GuestSelection from "./GuestSelection"
import { calculateTotalGuest } from "./Header"
import staysData from "../stays.json"

export default function Search({
  toggleDisplay,
  searchData,
  setSearchData,
  setSearchResults,
  matchedLocations,
}) {
  const [isFocus, setIsFocus] = useState({
    location: false,
    guest: false,
    page: false
  })
  const focusStyle = {
    border: "1px solid #333",
    borderRadius: "16px",
  }
  const locationFocus = isFocus.location ? focusStyle : {}
  const guestFocus = isFocus.guest ? focusStyle : {}
  const formRef = useRef(null)
  const locationRef = useRef(null)
  const guestRef = useRef(null)
  const guestSelectionRef= useRef(null)
  const totalGuestCount = calculateTotalGuest(searchData)
  const matchedLocationsEl = matchedLocations && matchedLocations.map(location =>
    <MatchedLocation
      key={nanoid()}
      city={location.city}
      country={location.country}
      handleChange={handleChange}
    />
  )

  function handleFocus(event) {
    event.stopPropagation()
    const { name } = event.target
    const targetInForm = formRef.current.contains(event.target)
    const targetInLocation = locationRef.current.contains(event.target)
    const targetInGuest = guestRef.current.contains(event.target)
    let targetInGuestSelection
    if (guestSelectionRef.current) {
      targetInGuestSelection = guestSelectionRef.current.contains(event.target)
    }

    if (name === "search") {
      setIsFocus({
        location: false,
        guest: false,
        page: false
      })
    } else if (targetInLocation && !isFocus.location) {
      setIsFocus({
        location: true,
        guest: false,
        page: false
      })
    } else if (
      (targetInGuest && !isFocus.guest) ||
      (targetInGuestSelection && isFocus.guest)
    ) {
      setIsFocus({
        location: false,
        guest: true,
        page: false
      })
    } else if (!targetInForm && !isFocus.page && !targetInLocation) {
      setIsFocus({
        location: false,
        guest: false,
        page: true
      })
    }
  }

  function handleChange(event) {
    event.preventDefault()
    const { name, value } = event.target
    setSearchData(prevData => {
      switch (name) {
        case "":
          return {
            ...prevData,
            location: value
          }

        case "location":
          return {
            ...prevData,
            location: value
          }
        
        case "adult-count-increment":
          return {
            ...prevData,
            adultCount: prevData.adultCount === "" ? 1 : prevData.adultCount + 1
          }

        case "children-count-increment":
          return {
            ...prevData,
            childrenCount: prevData.childrenCount === "" ? 1 : prevData.childrenCount + 1
          }

        case "adult-count-decrement":
          return {
            ...prevData,
            adultCount: prevData.adultCount !== "" ? prevData.adultCount - 1 : ""
          }

        case "children-count-decrement":
          return {
            ...prevData,
            childrenCount: prevData.childrenCount !== "" ? prevData.childrenCount - 1 : ""
          }
        default: 
          break
      }
    })
  }

  function hasValidLocation(stay, location) {
    if (location === "") {
      return true
    }

    let includesCity, includesCountry
    const locationParts = location.split(",")
    if (locationParts.length > 1) {
      const city = locationParts[0].trim()
      const country = locationParts[1].trim()
      includesCity = (city === stay.city)
      includesCountry = (country === stay.country)
      return (includesCity && includesCountry)
    } else {
      includesCity = (location === stay.city)
      includesCountry = (location === stay.country)      
      return (includesCity || includesCountry)
    }
  }

  function hasSufficientGuestCapacity(stay, totalGuestCount) {
    if (!totalGuestCount) {
      return true
    }
    return stay.maxGuests >= totalGuestCount
  }

  function filterStays(totalGuestCount) {
    const { location } = searchData
    const filteredStays = staysData.filter(stay => {
      return (
        hasValidLocation(stay, location) && 
        hasSufficientGuestCapacity(stay, totalGuestCount)
      )
    })
    return filteredStays
  }

  function handleSubmit(event) {
    event.preventDefault()
    toggleDisplay(event)
    const totalGuestCount = calculateTotalGuest(searchData)
    const filteredStays = filterStays(totalGuestCount)
    setSearchResults(filteredStays)
  }

  function handleClose(event) {
    toggleDisplay(event)
  }

  return (
    <div className="overlay" onClick={handleFocus}>
      <section className="search__container">
        <div className="search__header">
          <h1 className="search__title">Edit your search</h1>
          <button
            name="close"
            className="material-icons search__close-icon"
            onClick={handleClose}
          >close</button>
        </div>

        <form onSubmit={handleSubmit} className="search__form-flex">
          <div className="search__flex-item">
            <div className="search__form" ref={formRef}>
              <div
                className="search__location"
                style={locationFocus}
                onFocus={handleFocus}
                ref={locationRef}
              >
                <h1 className="search__form-title">Location</h1>
                <input
                  type="text"
                  name="location"
                  className="search__input"
                  placeholder="Location"
                  value={searchData.location}
                  onChange={handleChange}
                />
              </div>
              <div
                className="search__guests"
                style={guestFocus}
                onClick={handleFocus}
                ref={guestRef}
              >
                <h1 name="guest-title" className="search__form-title">Guests</h1>
                {
                  totalGuestCount ?
                    <div className="search__guest-count">{totalGuestCount} guests</div> :
                    <div
                      name="guest-count-placeholder"
                      className="search__guest-count-placeholder"
                    >Add guests</div>
                }
              </div>
            </div>
            {
              isFocus.location &&
              <div className="matched-locations__container">
                {matchedLocationsEl}
              </div>
            }
          </div>

          {
            isFocus.guest &&
            <GuestSelection
              searchData={searchData}
              handleFocus={handleFocus}
              guestSelectionRef={guestSelectionRef}
              handleChange={handleChange}
            />
          }

          <div className="search__btn-container">
            <button
              name="search"
              className="search__btn"
              onFocus={handleFocus}
            >
              <span className="material-icons search__icon">search</span>
              Search
            </button>
          </div>
        </form>
      </section >
    </div>
  )
}