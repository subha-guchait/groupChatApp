import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const getDecodedToken = () => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          localStorage.clear();
          return null;
        }
        return decodedToken;
      } catch (err) {
        localStorage.removeItem("token");
        return null;
      }
    }
  };

  const [authUser, setAuthUser] = useState(getDecodedToken);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
