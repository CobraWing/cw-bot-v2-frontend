import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../../Header';
import Breadcrumb from '../../Breadcrumb';
import Footer from '../../Footer';

import { Grid } from './styles';

interface TemplateProps {
  title?: string;
}

const LayoutDefault: React.FC<TemplateProps> = ({ title, children }) => (
  <Grid>
    <Helmet>
      <title>Cobra Wing Bot {title ? ` - ${title}` : ''}</title>
    </Helmet>
    <Header />
    <Breadcrumb />

    {children}

    <Footer />
  </Grid>
);

export default LayoutDefault;
