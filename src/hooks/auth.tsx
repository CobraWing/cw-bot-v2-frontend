import React, { createContext, useCallback, useState, useContext } from 'react';
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

  const signIn = useCallback(async ({ code }) => {
    const response = await api.get('/authorizations/discord/authorized', {
      params: {
        code,
      },
    });

    const { token, user, guilds } = response.data;

    localStorage.setItem('@CobraWingBot:token', token);
    localStorage.setItem('@CobraWingBot:user', JSON.stringify(user));
    localStorage.setItem('@CobraWingBot:guilds', JSON.stringify(guilds));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user, guilds });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CobraWingBot:token');
    localStorage.removeItem('@CobraWingBot:user');
    localStorage.removeItem('@CobraWingBot:guilds');

    setData({} as AuthState);
  }, []);

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
