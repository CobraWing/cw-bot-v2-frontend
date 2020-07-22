import React from 'react';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const ChooseServer: React.FC = () => {
  const { user, guilds, signOut } = useAuth();

  return (
    <Container>
      <p>Olá, {user.name}</p>
      <p>Escolha um dos servidores abaixo para gerenciar:,</p>
      <br />
      <br />
      <ul>
        {guilds.map((guild) => (
          <li>
            <img src={guild.icon} alt={guild.name} />
            <p>{guild.name}</p>
            <br />
          </li>
        ))}
      </ul>
      <br />
      <br />
      <br />
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </Container>
  );
};

export default ChooseServer;
