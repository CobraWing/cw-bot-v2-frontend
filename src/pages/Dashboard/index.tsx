import React from 'react';

import { Container } from './styles';

import LayoutDefault from '../../components/Layout/Default';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { selectedGuild } = useAuth();

  return (
    <LayoutDefault>
      <Container>
        <p>Server: {selectedGuild.name}</p>
      </Container>
    </LayoutDefault>
  );
};

export default Dashboard;
