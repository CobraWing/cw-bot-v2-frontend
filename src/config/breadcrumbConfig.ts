import { Server } from '@styled-icons/boxicons-regular';
import { Dashboard, MessageSquareAdd } from '@styled-icons/boxicons-solid';
import { Category } from '@styled-icons/material-rounded';
import { MessageDetail } from '@styled-icons/boxicons-regular';
import { Edit } from '@styled-icons/boxicons-regular';

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
      { name: 'Nova', icon: MessageSquareAdd },
    ],
  },
  {
    route: '/categories/edit',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      { name: 'Categorias', icon: Category, link: '/categories' },
      { name: 'Editar', icon: Edit },
    ],
  },
  {
    route: '/custom-commands',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      { name: 'Comandos Customizado', icon: MessageDetail },
    ],
  },
  {
    route: '/custom-commands/new',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      {
        name: 'Comandos Customizado',
        icon: MessageDetail,
        link: '/custom-commands',
      },
      { name: 'Novo', icon: MessageSquareAdd },
    ],
  },
  {
    route: '/custom-commands/edit',
    items: [
      { name: 'Servidores', icon: Server, link: '/servers' },
      { name: 'Dashboard', icon: Dashboard, link: '/dashboard' },
      {
        name: 'Comandos Customizado',
        icon: MessageDetail,
        link: '/custom-commands',
      },
      { name: 'Editar', icon: Edit },
    ],
  },
];

export default breadcrumbConfig;
