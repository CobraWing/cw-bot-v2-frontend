import styled from 'styled-components';
import { ArrowIosForwardOutline } from '@styled-icons/evaicons-outline';

export const BreadcrumbContent = styled.section`
  grid-area: BCRUMB;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 10px 20px 0 0;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      padding: 0 5px;
      transition: background-color 0.2s;
      transition: border-radius 0.1s;

      svg:first-child {
        margin-right: 5px;
      }
      a,
      a:link,
      a:visited {
        color: var(--text);
        text-decoration: underline;
      }
      &:hover {
        background: var(--quinary);
        border-radius: 20px;
      }
    }

    li:last-child {
      svg:last-child {
        display: none;
      }
    }
  }
`;

export const Arrow = styled(ArrowIosForwardOutline)`
  width: 25px;
  height: 25px;

  margin-left: 5px;
  color: var(--gray);
`;

export const BackButton = styled.button`
  background: transparent;
  border: 0;
  color: var(--text);

  width: 85px;
  text-align: left;

  border-radius: 10px;
  margin-right: 10px;

  transition: background-color 0.2s;
  transition: border-radius 0.2s;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: var(--quinary);

    svg {
      color: var(--text);
    }
  }
`;
