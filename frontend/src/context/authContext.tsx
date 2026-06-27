import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { refreshToken } from "../services/auth";
import { setLogoutHandler } from "../services/api";

interface authContextType {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  loading: boolean;
  logout: () => void;
}

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext<authContextType>({} as authContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Note: actual tokens are stored in httpOnly cookies set by backend
  // accessToken here is for UI state tracking only

  const logout = useCallback(() => {
    setAccessToken(null);
    setLoading(false);
  }, [setAccessToken]);

  // register logout handler with api
  useEffect(() => {
    setLogoutHandler(() => logout);
  }, [logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await refreshToken();
        // Backend sets httpOnly cookies; update local state to indicate authenticated
        setAccessToken(response?.accessToken || 'authenticated');
      } catch (e) {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}