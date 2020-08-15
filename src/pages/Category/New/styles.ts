import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  padding: 25px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 600px;
  height: 60px;

  border: 5px solid var(--quaternary);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const FormContainer = styled.div`
  width: 600px;
  padding: 30px 50px;

  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  background: var(--quaternary);

  .formContainerInput,
  .formContainerTextArea {
    margin-bottom: 15px;
  }
`;

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-around;

  div {
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;
`;
