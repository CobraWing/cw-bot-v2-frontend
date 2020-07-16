import React, { useCallback, useState, useEffect } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { useLocation, useHistory } from 'react-router-dom';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';
import api from '../../services/api';

import discordLogoImg from '../../assets/Discord-Logo-White.svg';
import logo from '../../assets/logo.png';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const code = location.search.replace('?code=', '');

    if (code) {
      setLoading(true);
      signIn({
        code,
      }).catch(() => {
        history.push('/');
        addToast({
          type: 'error',
          title: 'Erro ao fazer login',
          description: 'Ocorreu um erro ao fazer o login, tente novamente.',
        });
        setLoading(false);
      });
    }
  }, [addToast, history, location.search, signIn]);

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
          <Button loading={loading} type="submit">
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
