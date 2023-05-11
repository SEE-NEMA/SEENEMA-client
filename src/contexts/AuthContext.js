import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  authenticated: false,
  email:null,
  authenticate: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState(null);

  const login = (email, token) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem('email', email);
  };

  const logout = () => {
    setAuthenticated(false);
    setToken(null);
    setEmail(null);
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider value={{ email, authenticated, token,  login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
