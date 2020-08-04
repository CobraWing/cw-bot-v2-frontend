import React, { useCallback } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { ArrowBack } from '@styled-icons/boxicons-regular';

import breadcrumbConfig from '../../config/breadcrumbConfig';

import { BreadcrumbContent, BackButton, Arrow } from './styles';

const Breadcrumb: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const breadcrumbItems = breadcrumbConfig.find(
    (bc) => bc.route === location.pathname,
  );

  const handleBackButton = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <>
      <BreadcrumbContent>
        {location.pathname !== '/servers' && (
          <BackButton onClick={handleBackButton}>
            <ArrowBack size={20} />
            Voltar
          </BackButton>
        )}

        <ul>
          {breadcrumbItems &&
            breadcrumbItems.items.map(({ name, icon: Icon, link }) => (
              <li key={name}>
                <Icon size={20} />
                {link ? <Link to={link}>{name}</Link> : name}
                <Arrow />
              </li>
            ))}
        </ul>
      </BreadcrumbContent>
    </>
  );
};

export default Breadcrumb;
