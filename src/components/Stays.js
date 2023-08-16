import React from "react"
import { nanoid } from "nanoid"
import Stay from "./Stay"
import staysData from "../stays.json"

export default function Stays({ searchResults }) {
  const arrToMap = searchResults ? searchResults : staysData
  const stayEl = arrToMap.map(stay => 
    <Stay key={nanoid()} info={stay} />
  )
  const stayCount = stayEl.length > 12 ? "12+" : stayEl.length 

  return (
    <main className="container main__container">
      <div className="main__header">
        <h1 className="main__title">Stays in Finland</h1> 
        <span className="main__stay-count">{stayCount} stays</span>
      </div>
      <div className="main__stays-container">
        {stayEl}
      </div>
    </main>
  )
}