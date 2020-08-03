import styled from 'styled-components';
import { ArrowIosForwardOutline } from '@styled-icons/evaicons-outline';

export const BreadcrumbContent = styled.section`
  grid-area: BCRUMB;

  display: flex;
  align-items: center;

  width: 100%;
  padding: 0 20px;

  ul {
    display: flex;
    justify-content: center;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      margin-right: 10px;
      svg:first-child {
        margin-right: 5px;
      }
      a,
      a:link,
      a:visited {
        color: var(--text);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
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

  margin-left: 10px;
  color: var(--gray);
`;
