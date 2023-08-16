import { useEffect } from "react"
import staysData from "../stays.json"

export default function useMatchedLocationsSetter(searchData) {
  useEffect(() => {
    const locationMatches = staysData.map(stay => {
      let { location } = searchData
      const { city, country } = stay
      location = location.toLowerCase()
      if (
        location !== "" &&
        (
          city.toLowerCase().includes(location) ||
          country.toLowerCase().includes(location)
        ) 
      ) {
        return {
          city: city,
          country: country
        }
      } else {
        return null
      }
    }).filter(location => location)

    const uniqueLocationMatches = locationMatches.filter((location, index, self) => {
      return index === self.findIndex(el => {
        return el.city === location.city && el.country === location.country
      })
    })
    
    return uniqueLocationMatches
  }, [searchData.location])
}