import React from 'react';

import { Content } from './styles';

import loaderImg from '../../assets/loader.svg';

const Loader: React.FC = () => {
  return (
    <Content>
      <img src={loaderImg} alt="Loader" />
      <p>Carregando...</p>
    </Content>
  );
};

export default Loader;
