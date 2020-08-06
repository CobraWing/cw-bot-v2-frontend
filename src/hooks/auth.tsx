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
  selectedGuild: Guild;
  signIn(credentials: SignInData): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  updateSelectedGuild(guild: Guild): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const cookies = new Cookies();

  const [selectedGuild, setSelectedGuild] = useState<Guild>(() => {
    const guildJson = localStorage.getItem('@CobraWingBot:selectedGuild');
    if (guildJson) {
      const guild = JSON.parse(guildJson);
      delete api.defaults.headers.guildId;
      api.defaults.headers.guildId = guild.id;
      return guild;
    }
    return null;
  });

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CobraWingBot:token');
    const user = localStorage.getItem('@CobraWingBot:user');
    const guilds = localStorage.getItem('@CobraWingBot:guilds');
    delete api.defaults.headers.authorization;

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
      localStorage.removeItem('@CobraWingBot:selectedGuild');
      cookies.set('@CobraWingBot:session', true, { maxAge: 84924 });

      delete api.defaults.headers.authorization;
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user, guilds });
    },
    [cookies],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@CobraWingBot:token');
    localStorage.removeItem('@CobraWingBot:user');
    localStorage.removeItem('@CobraWingBot:guilds');
    localStorage.removeItem('@CobraWingBot:selectedGuild');
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

  const updateSelectedGuild = useCallback(
    (guild: Guild) => {
      delete api.defaults.headers.guildId;
      api.defaults.headers.guildid = guild.id;
      localStorage.setItem(
        '@CobraWingBot:selectedGuild',
        JSON.stringify(guild),
      );
      setSelectedGuild(guild);
    },
    [setSelectedGuild],
  );

  const isLogged = localStorage.getItem('@CobraWingBot:token');
  if (isLogged && !cookies.get('@CobraWingBot:session')) {
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
        selectedGuild,
        signIn,
        signOut,
        updateUser,
        updateSelectedGuild,
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
