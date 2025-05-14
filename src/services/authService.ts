export interface AuthResponse {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

interface JwtPayload {
  Email: string;
  UserID: number;
  exp: number;
  iat: number;
}

const TOKEN_KEY = '@App:token';
const USER_KEY = '@App:user';

const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.log('Erro ao decodificar o token JWT:', error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const decodedToken = parseJwt(token);
  if (!decodedToken) return true;
  
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  
  return currentTime > expirationTime;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await fetch('http://localhost:9000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json() as AuthResponse;
      
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    
    if (!token) return false;
    
    if (isTokenExpired(token)) {
      this.logout();
      return false;
    }
    
    return true;
  },

  setUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
};