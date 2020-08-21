import React from 'react';
import { Helmet } from 'react-helmet';

import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Cobra Wing Bot - 404 Página não encontrada</title>
      </Helmet>
      <h1>Page not found</h1>
    </Container>
  );
};

export default NotFound;
