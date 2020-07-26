import React from 'react';

import { FiPower } from 'react-icons/fi';

import { HeaderContent, Profile, LogoutButton } from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <HeaderContent>
      <img src={logoImg} alt="GoBarber" />

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
