import React, { useEffect } from 'react';

import { useLocation, useHistory } from 'react-router-dom';
import { Container, Content, AnimationContainer, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

const Loading: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  useEffect(() => {
    const code = location.search.replace('?code=', '');

    signIn({
      code,
    }).catch(() => {
      history.push('/');
      addToast({
        type: 'error',
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro ao fazer o login, tente novamente.',
      });
    });
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <p>Carregando...</p>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Loading;
