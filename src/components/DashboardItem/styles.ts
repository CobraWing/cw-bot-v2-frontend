import styled, { css } from 'styled-components';

interface ContainerProps {
  borderColor?: string;
}

export const Container = styled.div<ContainerProps>`
  display: flex;

  width: 370px;
  height: 150px;
  margin: 10px 10px;
  padding: 30px;

  border-radius: 10px;
  border: 2px solid var(--quaternary);
  background-color: var(--quaternary);
  box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  transition: transform 0.2s, border-color 0.2s;
  &:hover {
    transform: translateY(-7px);
    ${(props) =>
      props.borderColor &&
      css`
        border: 2px solid ${props.borderColor};
        strong {
          color: ${props.borderColor};
        }
      `}
  }
`;

export const ItemImageContainer = styled.div`
  display: flex;
  align-content: center;
`;

export const ItemDescriptionContainer = styled.div`
  padding-left: 20px;

  display: flex;
  flex-direction: column;

  strong {
    color: var(--white);
    font-size: 18px;
  }

  span {
    margin-top: 10px;
  }
`;
