import React, { useCallback } from 'react';

import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    api.get('/authorizations/discord').then((response) => {
      window.location.href = response.data.url;
    });
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <p>Login</p>
          <form onSubmit={handleLogin}>
            <Button type="submit">Logar</Button>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
