import styled from 'styled-components';

export const Label = styled.span`
  margin-right: 5px;
`;

export const Container = styled.div`
  padding: 6px 0;
  width: 100%;
  color: var(--input-default-color);
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }
`;
