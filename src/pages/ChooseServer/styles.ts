import styled from 'styled-components';
import { shade } from 'polished';

import Tooltip from '../../components/Tooltip';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: #23272a;
  > img {
    height: 70px;
  }
  button {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    background: transparent;
    border: 0;
    color: #fff;
    font-size: 12px;
    svg {
      color: #ff0000;
      width: 20px;
      height: 20px;
      margin-bottom: 5px;
    }
  }
`;

export const LogoutTooltip = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-left: 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
      margin-right: 5px;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

export const ContentTitle = styled.h3`
  text-transform: uppercase;
  margin-bottom: 30px;
`;

export const GuildList = styled.div`
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
  cursor: pointer;

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

    background: #e1ffb1;
    &:hover {
      background: ${shade(0.2, '#e1ffb1')};
    }

    svg {
      margin-right: 5px;
    }
  }
`;
