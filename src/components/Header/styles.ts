import styled from 'styled-components';

export const HeaderContent = styled.header`
  grid-area: HEADER;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 0 20px;

  a > img {
    height: 70px;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  margin-left: 20px;
  background: transparent;
  border: 0;
  z-index: 2;

  svg {
    color: var(--cw);
    width: 20px;
    height: 20px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    line-height: 24px;
    span {
      color: var(--text);
      margin-right: 5px;
    }
  }
`;
