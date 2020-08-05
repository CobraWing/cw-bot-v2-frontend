import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  padding: 25px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 20px;

  Form {
    margin-left: 10px;
    display: flex;
    position: relative;

    input {
      padding-right: 20px;
    }
  }

  .clear {
    position: absolute;
    left: 155px;
    top: -4px;
    background: transparent;
    border: 0;
    color: var(--gray);
    transition: color 0.2s;

    &:hover {
      color: var(--white);
    }
  }

  .filter {
    margin-left: 10px;
    height: 30px;
    padding-right: 5px;

    border: 1px solid var(--gray);
    border-radius: 20px;
    color: var(--white);
    background: transparent;
    transition: background-color 0.2s;

    svg {
      margin-left: 5px;
    }

    &:hover {
      color: var(--gray);
      background: var(--white);
    }
  }
`;

export const Table = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 15px;

  .header-icon {
    margin-left: 5px;
  }
`;

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

  width: 100%;
  padding: 0 20px;
  height: calc(100% - 40px);

  span {
    margin: 25px 0;
    font-size: 18px;
    text-align: center;

    strong {
      text-decoration: underline;
    }
  }

  button {
    margin: 0 10px;
    padding-right: 5px;

    svg {
      margin-left: 10px;
    }
  }
`;
