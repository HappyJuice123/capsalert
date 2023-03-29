import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
