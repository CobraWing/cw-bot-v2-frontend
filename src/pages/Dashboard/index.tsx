import React from 'react';
import { MessageDetail } from '@styled-icons/boxicons-regular';
import { Category } from '@styled-icons/material-rounded';

import { Container } from './styles';

import LayoutDefault from '../../components/Layout/Default';
import DashboardItem from '../../components/DashboardItem';

const Dashboard: React.FC = () => {
  return (
    <LayoutDefault>
      <Container>
        <DashboardItem
          title="Comandos customizados"
          description="Adicione ou gerencie os comandos customizados no servidor."
          destiny="/custom-commands"
          icon={MessageDetail}
          iconSize={50}
          iconColor="#7289DA"
        />
        <DashboardItem
          title="Categorias de comandos"
          description="Adicione ou gerencie as categorias dos comandos customizados no servidor."
          destiny="/categories"
          icon={Category}
          iconSize={50}
          iconColor="#ffc107"
        />
        <DashboardItem title="" description="" destiny="/dashboard" />
        <DashboardItem title="" description="" destiny="/dashboard" />
        <DashboardItem title="" description="" destiny="/dashboard" />
        <DashboardItem title="" description="" destiny="/dashboard" />
        <DashboardItem title="" description="" destiny="/dashboard" />
        <DashboardItem title="" description="" destiny="/dashboard" />
      </Container>
    </LayoutDefault>
  );
};

export default Dashboard;
