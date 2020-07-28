import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;

  margin: 0 auto;

  max-width: 1300px;
  min-width: 660px;

  grid-template-columns: 150px auto 150px;
  grid-template-rows: 100px auto 50px;

  grid-template-areas:
    'HEADER HEADER HEADER'
    'LEFT CENTER RIGHT'
    'FOOTER FOOTER FOOTER';

  height: 100vh;
`;
