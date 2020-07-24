import React from 'react';

import { FiPower, FiChevronRight } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  LogoutTooltip,
  Content,
  ContentTitle,
  GuildList,
  GuildContainer,
} from './styles';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const ChooseServer: React.FC = () => {
  const { user, guilds, signOut } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
            <img src={user.avatar} alt={user.name} />
          </Profile>

          <button type="button" onClick={signOut}>
            <LogoutTooltip title="Deslogar">
              <FiPower />
            </LogoutTooltip>
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <ContentTitle>Selecione um dos servidores:</ContentTitle>
        <GuildList>
          {guilds.map((guild) => (
            <GuildContainer>
              <img src={guild.icon} alt={guild.name} />
              <strong>{guild.name}</strong>
              <Button>
                Escolher
                <FiChevronRight size={22} />
              </Button>
            </GuildContainer>
          ))}
        </GuildList>
      </Content>
    </Container>
  );
};

export default ChooseServer;
