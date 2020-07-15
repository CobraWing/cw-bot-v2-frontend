import React, { useCallback } from 'react';
import { FiLogIn } from 'react-icons/fi';

import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import api from '../../services/api';

import discordLogoImg from '../../assets/Discord-Logo-White.svg';
import logo from '../../assets/logo.png';

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
        <img src={logo} alt="cobrawing-logo" />
        <form onSubmit={handleLogin}>
          <Button type="submit">
            <img src={discordLogoImg} alt="discord-logo" />
            Login com Discord
            <FiLogIn />
          </Button>
        </form>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
