import React from "react"
import logo from "../img/logo.png"

export function calculateTotalGuest(searchData) {
  const { adultCount, childrenCount } = searchData
  let totalGuestCount
  if (adultCount === "" && childrenCount !== "") {
    totalGuestCount = childrenCount
  } else if (adultCount !== "" && childrenCount === "") {
    totalGuestCount = adultCount
  } else {
    totalGuestCount = adultCount + childrenCount
  }
  return totalGuestCount
}

export default function Header({ toggleDisplay, searchData }) {
  const { location } = searchData
  const totalGuestCount = calculateTotalGuest(searchData)

  return (
    <header className="container header__container">
      <a href="/">
        <img 
          src={logo} 
          className="header__logo"
          alt="Header logo"
        />
      </a>
      <div className="header__btn-container">
        <button
          className="header__btn"
          onClick={toggleDisplay}
        >
          <div className="header__btn-content">
            <div 
              className="header__location"
              style={location ? { color: "#333" } : {}}
            >{location ? location: "Location"}</div>
            <div 
              className="header__guests"
              style={totalGuestCount ? { color: "#333" } : {}}
            >
              {totalGuestCount ? `${totalGuestCount} guests` : "Add guests"}
            </div>
            <div className="material-icons header__search-icon">search</div>
          </div>
        </button>
      </div>
    </header>
  )
}