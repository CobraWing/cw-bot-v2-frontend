import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FiPower } from 'react-icons/fi';

import {
  HeaderContent,
  Logo,
  SelectedGuildContainer,
  GuildLogo,
  ChangeGuild,
  GuildName,
  ProfileContainer,
  Profile,
  LogoutButton,
} from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';

const Header: React.FC = () => {
  const { user, signOut, selectedGuild } = useAuth();
  const location = useLocation();

  return (
    <HeaderContent>
      <Logo
        href="http://discord.io/cobrawing"
        target="_blank"
        rel="noopener noreferrer"
        title="Acesse o discord da Cobra Wing"
      >
        <img src={logoImg} alt="Cobra Wing Bot" />
      </Logo>

      {location.pathname !== '/servers' && (
        <SelectedGuildContainer>
          <GuildLogo>
            <img src={selectedGuild.icon} alt={selectedGuild.name} />
          </GuildLogo>
          <GuildName>
            <strong>{selectedGuild.name}</strong>
            <Link to="/servers">
              <ChangeGuild title="Alterar" />
            </Link>
          </GuildName>
        </SelectedGuildContainer>
      )}

      <ProfileContainer>
        <Profile>
          <div>
            <span>Bem-vindo,</span>
            <strong>{user.name}</strong>
          </div>
          <img src={user.avatar} alt={user.name} />
        </Profile>

        <LogoutButton type="button" onClick={signOut}>
          <FiPower title="Sair" />
        </LogoutButton>
      </ProfileContainer>
    </HeaderContent>
  );
};

export default Header;
