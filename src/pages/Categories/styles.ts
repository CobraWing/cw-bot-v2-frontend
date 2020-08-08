import styled from 'styled-components';

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
