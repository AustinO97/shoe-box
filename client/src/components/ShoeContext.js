import React, { createContext, useState } from "react";

const ShoeContext = createContext()

const ShoeProvider = ({ children }) => {
  const [shoes, setShoes] = useState([])
  const [shoe, setShoe] = useState(null)
  const [error, setError] = useState(null)

  return (
      <ShoeContext.Provider value={{shoes, setShoes, shoe, setShoe, error, setError }}>
          {children}
      </ShoeContext.Provider>
  )
}

export { ShoeContext, ShoeProvider }