import React, { createContext, useState} from "react";

const ReviewContext = createContext()

const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)

  return (
    <ReviewContext.Provider value={{reviews, setReviews, error, setError}}>
        {children}
    </ReviewContext.Provider>
  )
}

export { ReviewContext, ReviewProvider }