import React from 'react';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <p>Dashboard</p>
      <p>User: {user.name}</p>
    </Container>
  );
};

export default Dashboard;
