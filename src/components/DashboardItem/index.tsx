import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { StyledIconProps } from '@styled-icons/styled-icon';

import {
  Container,
  ItemImageContainer,
  ItemDescriptionContainer,
} from './styles';

interface Props {
  title: string;
  description?: string;
  destiny: string;
  icon?: React.ComponentType<StyledIconProps>;
  iconSize?: number;
  iconColor?: string;
}

const DashboardItem: React.FC<Props> = ({
  title,
  description,
  destiny,
  icon: Icon,
  iconSize = 20,
  iconColor,
}) => {
  const history = useHistory();

  const handleNavigate = useCallback(() => {
    history.push(destiny);
  }, [history, destiny]);

  return (
    <Container onClick={handleNavigate} borderColor={iconColor}>
      <ItemImageContainer>
        {Icon && <Icon size={iconSize} color={iconColor} />}
      </ItemImageContainer>
      <ItemDescriptionContainer>
        <strong>{title}</strong>
        <span>{description}</span>
      </ItemDescriptionContainer>
    </Container>
  );
};

export default DashboardItem;
