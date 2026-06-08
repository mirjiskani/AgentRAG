import { createContext, useContext, useEffect, useState } from "react";
import { refreshToken } from "../services/auth";
import { setToken } from "../lib/tokes-store";

interface authContextType {
    accessToken:string,
    setAccessToken: (accessToken: string|null) => void;
    loading: boolean;
}

export const AuthContext = createContext<authContextType>({} as authContextType);


export default function AuthProvider(
    {children}: {children: React.ReactNode}
) {

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const initializeAuth =
      async () => {
        try {
          const response =
            await refreshToken();

          setAccessToken(
            response.accessToken
          );

          setToken(
            response.accessToken
          );
        } catch {
          setAccessToken(null);

          setToken(null);
        } finally {
          setLoading(false);
        }
      };

    initializeAuth();
  }, []);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}