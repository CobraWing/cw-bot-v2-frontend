import React from 'react';

import Header from '../../Header';
import Breadcrumb from '../../Breadcrumb';
import Footer from '../../Footer';

import { Grid } from './styles';

const LayoutDefault: React.FC = ({ children }) => (
  <Grid>
    <Header />
    <Breadcrumb />

    {children}

    <Footer />
  </Grid>
);

export default LayoutDefault;
