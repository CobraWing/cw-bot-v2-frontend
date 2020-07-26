import React from 'react';

import { FiPower } from 'react-icons/fi';

import { HeaderContent, Profile, LogoutButton } from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <HeaderContent>
      <a
        href="http://discord.io/cobrawing"
        target="_blank"
        rel="noopener noreferrer"
        title="Acesse o discord da Cobra Wing"
      >
        <img src={logoImg} alt="Cobra Wing Bot" />
      </a>

      <Profile>
        <div>
          <span>Bem-vindo,</span>
          <strong>{user.name}</strong>
        </div>
        <img src={user.avatar} alt={user.name} />
      </Profile>

      <LogoutButton type="button" onClick={signOut}>
        <FiPower />
      </LogoutButton>
    </HeaderContent>
  );
};

export default Header;
