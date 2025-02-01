import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const getToken = () => {
    let token = localStorage.getItem("token") || null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          localStorage.removeItem("token");
          return null;
        }
      } catch (err) {
        localStorage.removeItem("token");
        return null;
      }
    }
    return token;
  };

  const [authUser, setAuthUser] = useState(getToken);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
