import React from "react"
import { Link } from "react-router-dom"

export default function Stay({ info }) {
  const superHost = info.superHost && <h1 className="stay__superhost">super host</h1>
  const bedCount = info.beds ? info.beds : 0

  return (
    <Link to="#">
      <article className="stay__container">
        <img 
          src={info.photo} 
          className="stay__image" 
          alt="Stay image"
        />
        <div className="stay__description">
          {superHost}
          <span className="stay__type">{`${info.type} . ${bedCount} beds`}</span>
          <span className="material-icons">star</span>
          <span className="stay__rating">{info.rating}</span>
        </div>
        <h1 className="stay__title">{info.title}</h1>
      </article>
    </Link>
  )
}