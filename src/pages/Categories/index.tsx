import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import LayoutDefault from '../../components/Layout/Default';

const Categories: React.FC = () => {
  return (
    <LayoutDefault>
      <Container>
        <p>Categorias - Em construção...</p>
        <Link to="/dashboard">Voltar</Link>
      </Container>
    </LayoutDefault>
  );
};

export default Categories;
