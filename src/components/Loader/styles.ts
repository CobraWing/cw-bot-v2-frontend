import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  z-index: 6;
  background: rgba(0, 0, 0, 0.8) !important;

  height: 100%;
  width: 100%;

  overflow-x: hidden;
  overflow-y: hidden;

  img {
    margin-top: 30vh;
    width: 80px;
    height: 80px;
  }

  p {
    margin-left: 10px;
  }
`;
