import React from 'react';

import { FiChevronRight } from 'react-icons/fi';

import LayoutDefault from '../../components/Layout/Default';

import { Container, ContentTitle, GuildList, GuildContainer } from './styles';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

const ChooseServer: React.FC = () => {
  const { guilds } = useAuth();

  return (
    <LayoutDefault>
      <Container>
        <ContentTitle>Selecione um dos servidores:</ContentTitle>
        <GuildList>
          {guilds.map((guild) => (
            <GuildContainer key={guild.id}>
              <img src={guild.icon} alt={guild.name} />
              <strong>{guild.name}</strong>
              <Button tp="success">
                Escolher
                <FiChevronRight size={22} />
              </Button>
            </GuildContainer>
          ))}
        </GuildList>
      </Container>
    </LayoutDefault>
  );
};

export default ChooseServer;
