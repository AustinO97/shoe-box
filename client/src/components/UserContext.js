import React, { createContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  return (
    <UserContext.Provider value={{users, setUsers, error, setError}}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }