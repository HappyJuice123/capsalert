import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../contexts/User";
import { useContext, useEffect } from "react";

export const setUser = () => {
  const { setUserId } = useContext(UserContext);

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
};
