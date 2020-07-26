import styled from 'styled-components';

export const FooterContent = styled.footer`
  grid-area: FOOTER;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: var(--gray);
  }

  a {
    margin: 0 5px;
  }
  a:link,
  a:visited {
    color: var(--gray);
  }
`;
