import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const login = (name, email) => {
    setUser({ name, email });
    setCurrentPage("dashboard");
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        currentPage,
        login,
        logout,
        navigate: setCurrentPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}