import React from 'react';

import {
  Container,
  ItemContainer,
  ItemImageContainer,
  ItemDescriptionContainer,
} from './styles';

import LayoutDefault from '../../components/Layout/Default';

const Dashboard: React.FC = () => {
  return (
    <LayoutDefault>
      <Container>
        <ItemContainer>
          <ItemImageContainer />
          <ItemDescriptionContainer />
        </ItemContainer>

        <ItemContainer>
          <ItemImageContainer />
          <ItemDescriptionContainer />
        </ItemContainer>

        <ItemContainer>
          <ItemImageContainer />
          <ItemDescriptionContainer />
        </ItemContainer>
      </Container>
    </LayoutDefault>
  );
};

export default Dashboard;
