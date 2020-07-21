import React, { createContext, useCallback, useState, useContext } from 'react';
import Cookies from 'universal-cookie';
import api from '../services/api';

interface Guild {
  id: string;
  name: string;
  icon: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
  guilds: Guild[];
}

interface SignInData {
  code: string;
}

interface AuthContextData {
  user: User;
  guilds: Guild[];
  signIn(credentials: SignInData): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const cookies = new Cookies();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CobraWingBot:token');
    const user = localStorage.getItem('@CobraWingBot:user');
    const guilds = localStorage.getItem('@CobraWingBot:guilds');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
        guilds: JSON.parse(guilds || '[]'),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ code }) => {
      const response = await api.get('/authorizations/discord/authorized', {
        params: {
          code,
        },
      });

      const { token, user, guilds } = response.data;

      localStorage.setItem('@CobraWingBot:token', token);
      localStorage.setItem('@CobraWingBot:user', JSON.stringify(user));
      localStorage.setItem('@CobraWingBot:guilds', JSON.stringify(guilds));
      cookies.set('@CobraWingBot:session', true, { maxAge: 84924 });

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user, guilds });
    },
    [cookies],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@CobraWingBot:token');
    localStorage.removeItem('@CobraWingBot:user');
    localStorage.removeItem('@CobraWingBot:guilds');
    cookies.remove('@CobraWingBot:session');

    setData({} as AuthState);
  }, [cookies]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@CobraWingBot:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        guilds: data.guilds,
      });
    },
    [setData, data.token, data.guilds],
  );

  const isLogged = localStorage.getItem('@CobraWingBot:token');
  if (isLogged && !cookies.get('@CobraWingBot:session')) {
    console.log('invalidate session');
    localStorage.removeItem('@CobraWingBot:token');
    localStorage.removeItem('@CobraWingBot:user');
    localStorage.removeItem('@CobraWingBot:guilds');
    cookies.set('@CobraWingBot:session-expirated', true, { maxAge: 5 * 60 });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        guilds: data.guilds,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
