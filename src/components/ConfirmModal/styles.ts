import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';

const appearFromTop = keyframes`
  from {
    opacity: 0.5;
    transform: translate(-50%,-75%);
  }
  to {
    opacity: 1;
    transform: translate(-50%,-60%);
  }
`;

export const MyModal = styled(Modal)`
  &.ReactModal__Content {
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;

    animation: ${appearFromTop} 0.5s;

    width: 500px;
    height: 200px;
    background: var(--tertiary);
    border: 1px var(--info-light) solid;
    border-radius: 10px;
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.4);

    transform: translate(-50%, -60%);
  }
`;

export const MyModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;

  background: var(--secondary);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  color: var(--white);
  font-weight: bold;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: -11px;
  top: -13px;
  background: transparent;
  border: 0;

  svg {
    color: var(--white);
    width: 30px;
    height: 30px;
  }
`;

export const MyModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  padding: 0 20px;
  height: calc(100% - 40px);

  span {
    font-size: 18px;
    text-align: center;

    strong {
      text-decoration: underline;

      span {
        color: var(--cw);
        background-color: var(--white);
        text-decoration: none;
      }
    }
  }

  div {
    display: flex;

    button {
      margin: 0 10px;
      padding-right: 10px;
      justify-content: space-between;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 95px;

      svg {
        margin-left: 10px;
      }
    }
  }
`;
