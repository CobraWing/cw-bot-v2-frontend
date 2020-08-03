import { Server } from '@styled-icons/boxicons-regular';
import { Dashboard } from '@styled-icons/boxicons-solid';

const breadcrumbConfig = [
  {
    route: '/dashboard',
    items: [{ name: 'Servidores', icon: Server, link: '/servers' }],
  },
  {
    route: '/categories',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
    ],
  },
];

export default breadcrumbConfig;
