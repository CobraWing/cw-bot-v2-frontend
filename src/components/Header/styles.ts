import styled from 'styled-components';
import { ExchangeAlt } from 'styled-icons/fa-solid';

export const HeaderContent = styled.header`
  grid-area: HEADER;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 20px;
`;

export const Logo = styled.a`
  img {
    height: 70px;
  }
`;

export const SelectedGuildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 45px;
    height: 45px;
  }
`;

export const GuildLogo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 45px;
    height: 45px;
  }
`;

export const ChangeGuild = styled(ExchangeAlt)`
  width: 20px;
  height: 20px;

  margin-left: 10px;
  color: var(--symbol);
  cursor: pointer;
`;

export const GuildName = styled.div`
  display: flex;
  align-items: center;

  strong {
    margin-left: 10px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;

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

export const LogoutButton = styled.button`
  margin-left: 20px;
  background: transparent;
  border: 0;
  z-index: 5;

  svg {
    color: var(--cw);
    width: 20px;
    height: 20px;
  }
`;
