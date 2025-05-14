import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, LoginCredentials } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = () => {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!authService.isAuthenticated() && user !== null) {
        setUser(null);
        window.location.href = '/login';
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [user]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const success = await authService.login(credentials);
    
    if (success) {
      const mockUser: User = { email: credentials.email };
      authService.setUser(mockUser);
      setUser(mockUser);
    }
    
    return success;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: authService.isAuthenticated(),
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};