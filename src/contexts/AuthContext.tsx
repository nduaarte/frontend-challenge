import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { getJSON, setJSON } from "../utils/storage";

type AuthCtx = {
  user: User | null;
  login: (email: string, name?: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => getJSON("user"));

  useEffect(() => setJSON("user", user), [user]);

  const login = async (email: string, name?: string) => {
    await new Promise((r) => setTimeout(r, 600)); // simulate latency
    const u: User = {
      id: String(Date.now()),
      email,
      name: name || email.split("@")[0],
    };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
