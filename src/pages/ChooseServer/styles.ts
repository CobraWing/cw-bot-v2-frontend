import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

export const ContentTitle = styled.h3`
  text-transform: uppercase;
`;

export const GuildList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
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
    border-top: 1px #99aab5 solid;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong {
    margin-left: 20px;
    margin-right: auto;
  }

  button {
    display: flex;
    align-content: center;
    align-items: center;
    padding-right: 0;

    svg {
      margin-right: 5px;
    }
  }
`;
