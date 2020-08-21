import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import LayoutDefault from '../../components/Layout/Default';

const CustomCommands: React.FC = () => {
  return (
    <LayoutDefault title="Lista Comandos">
      <Container>
        <p>Comandos customizados - Em construção...</p>
        <span>
          <Link to="/dashboard">Voltar</Link>
        </span>
      </Container>
    </LayoutDefault>
  );
};

export default CustomCommands;
