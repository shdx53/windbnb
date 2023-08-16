import React from "react"

export default function GuestSelection({ 
  searchData, 
  handleFocus,
  guestSelectionRef,
  handleChange 
}) {
  const adultCounterEl = searchData.adultCount ? searchData.adultCount : 0
  const childrenCounterEl = searchData.childrenCount ? searchData.childrenCount : 0

  return (
    <div className="guest-selection__container" ref={guestSelectionRef} onClick={(event) => handleFocus(event)}>
      <div className="guest-selection__adult">
        <h1 className="guest-selection__title">Adults</h1><br />
        <span className="guest-selection__subtitle">Ages 13 or above</span><br />
        <button
          name="adult-count-decrement"
          className="guest-selection__counter-btn"
          onClick={handleChange}
        >-</button>
        <span className="guest-selection__counter">{adultCounterEl}</span>
        <button
          name="adult-count-increment"
          className="guest-selection__counter-btn"
          onClick={handleChange}
        >+</button>
      </div><br />
      <div className="guest-selection__children">
        <h1 className="guest-selection__title">Children</h1><br />
        <span className="guest-selection__subtitle">Ages 2-12</span><br />
        <button
          name="children-count-decrement"
          className="guest-selection__counter-btn"
          onClick={handleChange}
        >-</button>
        <span className="guest-selection__counter">{childrenCounterEl}</span>
        <button
          name="children-count-increment"
          className="guest-selection__counter-btn"
          onClick={handleChange}
        >+</button>
      </div>
    </div>
  )
}