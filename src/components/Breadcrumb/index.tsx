import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import breadcrumbConfig from '../../config/breadcrumbConfig';

import { BreadcrumbContent, Arrow } from './styles';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const breadcrumbItems = breadcrumbConfig.find(
    (bc) => bc.route === location.pathname,
  );

  return (
    <>
      <BreadcrumbContent>
        <ul>
          {breadcrumbItems &&
            breadcrumbItems.items.map(({ name, icon: Icon, link }) => (
              <li>
                <Icon size={20} />
                <Link to={link}>{name}</Link>
                <Arrow />
              </li>
            ))}
        </ul>
      </BreadcrumbContent>
    </>
  );
};

export default Breadcrumb;
