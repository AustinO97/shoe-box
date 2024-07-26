import React, { createContext, useState } from "react";

const CategoryContext = createContext()

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)

  return (
      <CategoryContext.Provider value={{categories, setCategories, error, setError}}>
          {children}
      </CategoryContext.Provider>
  )
}

export { CategoryContext, CategoryProvider }