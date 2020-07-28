import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;

  width: 370px;
  height: 150px;
  margin: 7px 7px;
  padding: 30px;

  border-radius: 10px;
  background-color: var(--quaternary);
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  transition: background-color 0.2s;
  &:hover {
    background-color: ${lighten(0.1, '#40444b')};
    margin-top: 2px;
  }
`;

export const ItemImageContainer = styled.div`
  display: flex;
  align-content: center;
`;

export const ItemDescriptionContainer = styled.div`
  padding-left: 20px;

  display: flex;
  flex-direction: column;

  strong {
    color: var(--white);
    font-size: 18px;
  }

  span {
    margin-top: 10px;
  }
`;
