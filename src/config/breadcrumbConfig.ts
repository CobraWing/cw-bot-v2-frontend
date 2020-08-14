import { Server } from '@styled-icons/boxicons-regular';
import { Dashboard, MessageSquareAdd } from '@styled-icons/boxicons-solid';
import { Category } from '@styled-icons/material-rounded';

const breadcrumbConfig = [
  {
    route: '/dashboard',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard },
    ],
  },
  {
    route: '/categories',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      { name: 'Categorias', icon: Category },
    ],
  },
  {
    route: '/categories/new',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      { name: 'Categorias', icon: Category, link: '/categories' },
      { name: 'Nova Categoria', icon: MessageSquareAdd },
    ],
  },
];

export default breadcrumbConfig;
