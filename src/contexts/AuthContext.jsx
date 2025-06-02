import React, { createContext, useContext, useState, useEffect } from 'react';

const users = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
  { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
];

const AuthContext = createContext();
export { AuthContext };

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email, password, role) => {
    const match = users.find(
      u => u.email === email && u.password === password && u.role === role
    );
    if (match) {
      setUser(match);
      localStorage.setItem("user", JSON.stringify(match));
      return { success: true, user: match };
    }
    return { success: false, message: "Invalid credentials or role mismatch" };
  };  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
