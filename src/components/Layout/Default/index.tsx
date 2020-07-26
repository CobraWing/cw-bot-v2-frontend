import React from 'react';

import Header from '../../Header';

import { Grid, Footer } from './styles';

const LayoutDefault: React.FC = ({ children }) => (
  <Grid>
    <Header />

    {children}

    <Footer />
  </Grid>
);

export default LayoutDefault;
