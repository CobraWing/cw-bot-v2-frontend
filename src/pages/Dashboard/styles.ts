import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;

  > div:not(:first-child) {
    margin-left: 25px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;

  width: 350px;
  height: 150px;

  border-radius: 10px;
  background-color: var(--quaternary);
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  transition: background-color 0.2s;
  &:hover {
    background-color: ${lighten(0.05, '#40444b')};
  }

  & > div {
    margin
  }
`;

export const ItemImageContainer = styled.div``;

export const ItemDescriptionContainer = styled.div``;
