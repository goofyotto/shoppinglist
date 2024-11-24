import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {

  const [loggedInUser, setLoggedInUser] = useState("67265e0baa72db8c5a0cd791");

  const userMap = {
    user01: {
      _id: "67265e0baa72db8c5a0cd791",
      username: "petr.maly",
    },
    user02: {
      _id: "67265e0baa72db8c5a0cd792",
      username: "adam.vesely",
    },
    user03: {
      _id: "67265e0baa72db8c5a0cd793",
      username: "vaclav.mlady",
    },
    user04: {
      _id: "67265e0baa72db8c5a0cd794",
      username: "pavel.rychly",
    },
  };

  const value = {
    userMap,
    userList: Object.keys(userMap).map((userId) => userMap[userId]),
    loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
