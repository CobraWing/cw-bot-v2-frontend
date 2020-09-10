import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;

  margin: 0 auto;

  max-width: var(--max-width);
  min-width: var(--min-width);

  grid-template-columns: 150px auto 150px;
  grid-template-rows: 100px 40px auto 50px;

  grid-template-areas:
    'HEADER HEADER HEADER'
    'BCRUMB BCRUMB BCRUMB'
    'LEFT CENTER RIGHT'
    'FOOTER FOOTER FOOTER';

  height: auto;
`;
