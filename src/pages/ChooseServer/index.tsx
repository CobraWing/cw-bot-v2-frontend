import React, { useCallback } from 'react';

import { FiChevronRight } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import LayoutDefault from '../../components/Layout/Default';

import { Container, ContentTitle, GuildList, GuildContainer } from './styles';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

const ChooseServer: React.FC = () => {
  const { guilds } = useAuth();
  const history = useHistory();

  const handleSelectServer = useCallback(
    (guild) => {
      localStorage.setItem(
        '@CobraWingBot:selectedGuild',
        JSON.stringify(guild),
      );
      history.push('/dashboard');
    },
    [history],
  );

  return (
    <LayoutDefault>
      <Container>
        {guilds && guilds.length > 0 && (
          <>
            <ContentTitle>
              Selecione um dos servidores abaixo para gerenciar:
            </ContentTitle>
            <GuildList>
              {guilds.map((guild) => (
                <GuildContainer key={guild.id}>
                  <img src={guild.icon} alt={guild.name} />
                  <strong>{guild.name}</strong>
                  <Button
                    tp="success"
                    onClick={() => handleSelectServer(guild)}
                  >
                    Selecionar
                    <FiChevronRight size={22} />
                  </Button>
                </GuildContainer>
              ))}
            </GuildList>
          </>
        )}
        {guilds && guilds.length === 0 && (
          <>
            <ContentTitle>
              Você não tem permissão para gerenciar servidores.
            </ContentTitle>
            <ContentTitle>
              Contate com o administrador do servidor e faça login novamente.
            </ContentTitle>
          </>
        )}
      </Container>
    </LayoutDefault>
  );
};

export default ChooseServer;
