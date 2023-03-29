import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userId, setUserId] = useState("");

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //User is signed in
        const uid = user.uid;
        console.log("User uid is", uid);
        setUserId(uid);
        // ...
      } else {
        // User is signed out
        setUserId("");
      }
    });
  }, []);

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
