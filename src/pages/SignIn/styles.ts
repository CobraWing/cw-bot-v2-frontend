import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 300px;
  max-width: 500px;
  border-radius: 10px;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.6); /* Black w/opacity/see-through */
  color: #ffffff;

  button {
    background: #7289da;
    color: #ffffff;
    font-size: 20px;
    font-family: 'Roboto', serif;
    margin-top: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#7289da')};
    }

    img {
      width: 30px;
      margin-right: 5px;
    }

    svg {
      margin-left: 10px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
  filter: blur(1px);
  -webkit-filter: blur(1px);
`;
