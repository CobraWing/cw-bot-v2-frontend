import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  padding-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentTitle = styled.h3`
  margin-bottom: 10px;
  cursor: default;
`;

export const GuildList = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const GuildContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding: 10px;
  width: 500px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #23272a;
  }

  & + div {
    border-top: 1px var(--quaternary) solid;
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  strong {
    margin-left: 20px;
    margin-right: auto;
    cursor: default;
  }

  button {
    display: flex;
    align-content: center;
    align-items: center;
    padding-right: 0;
    border-radius: 20px;

    svg {
      margin-right: 5px;
    }
  }
`;
