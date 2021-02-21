import styled from 'styled-components';

export const Label = styled.span`
  margin-right: 5px;
  margin-left: 10px;
`;

export const Container = styled.div`
  padding: 8px 0;
  margin-bottom: 15px;
  color: var(--input-default-color);
  display: flex;
  align-items: center;

  svg {
    margin-right: 16px;
  }

  > div {
    border: 2px solid transparent;
    &:hover {
      border: 2px solid var(--input-default-color);
    }
  }
`;
