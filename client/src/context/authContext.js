import React from "react";
const UserContext = React.createContext();

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be rendered within the UserContext.Provider"
    );
  }
  return context;
}

export default UserContext;
