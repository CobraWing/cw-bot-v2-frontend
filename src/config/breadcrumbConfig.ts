import { Server } from '@styled-icons/boxicons-regular';
import { Dashboard } from '@styled-icons/boxicons-solid';
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
];

export default breadcrumbConfig;
