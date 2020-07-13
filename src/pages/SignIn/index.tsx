import React from 'react';

import { Container, Content, AnimationContainer, Background } from './styles';

const SignIn: React.FC = () => {
    
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <p>Login</p>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
