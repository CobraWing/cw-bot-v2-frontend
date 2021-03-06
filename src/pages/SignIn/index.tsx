import React, { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FiLogIn } from 'react-icons/fi';

import { useLocation, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
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
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get('@CobraWingBot:session-expirated')) {
      addToast({
        type: 'error',
        title: 'Sessão expirada',
        description: 'Sua sessão expirou, faça login novamente.',
      });
      cookies.remove('@CobraWingBot:session-expirated');
      return;
    }

    const code = location.search.replace('?code=', '');

    if (code && !loading) {
      setLoading(true);
      signIn({
        code,
      }).catch(() => {
        history.push('/');
        addToast({
          type: 'error',
          title: 'Erro ao fazer login',
          description:
            'Ocorreu um erro ao fazer o login, tente novamente. (#2/2)',
        });
        setLoading(false);
      });
    }
  }, [addToast, history, location.search, signIn, cookies, loading]);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      api
        .get('/authorizations/discord')
        .then((response) => {
          window.location.href = response.data.url;
        })
        .catch(() => {
          addToast({
            type: 'error',
            title: 'Erro ao fazer login',
            description:
              'Ocorreu um erro ao fazer o login, tente novamente. (#1/2)',
          });
          setLoading(false);
        });
    },
    [addToast],
  );

  return (
    <Container>
      <Helmet>
        <title>Cobra Wing Bot - Login</title>
      </Helmet>
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
