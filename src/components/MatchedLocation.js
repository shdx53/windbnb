import React from "react"

export default function MatchedLocation({ city, country, handleChange }) {
  return (
    <div className="matched-location">
      <span className="material-icons matched-location__location-icon">
        location_on
      </span>
      <button
        value={`${city}, ${country}`}
        onClick={handleChange}
        className="matched-location__btn"
      >{`${city}, ${country}`}</button>
    </div>
  )
}