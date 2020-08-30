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

  width: 100%;
  height: 60px;

  border: 5px solid var(--quaternary);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex: auto;

  width: 100%;

  border: 5px solid var(--quaternary);
  border-top: 0;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const FormContainer = styled.div`
  width: 45%;
  padding: 20px;

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

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 55%;
  padding: 20px;

  p {
    text-align: center;
  }
`;

export const PreviewContainerBox = styled.div`
  display: flex;

  margin-top: 20px;
`;

export const BotAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const MessageInfos = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  margin-left: 15px;
`;

export const BotName = styled.div`
  display: flex;
  color: rgb(7, 125, 245);

  strong {
    margin-right: 4px;
  }

  span {
    color: #72767d;
    font-size: 12px;
    padding-top: 3px;
  }
`;

export const BotTag = styled.div`
  background: #7289da;
  color: #fff;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
  height: 15px;
  font-weight: 500;
  margin-right: 8px;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 200px;
  max-width: 570px;
  margin-top: 6px;
  padding: 15px 10px;
  border-radius: 4px;
  border-left: 4px solid var(--cw);
  background-color: var(--secondary);
`;

export const UserInfos = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  strong {
    font-weight: 600;
  }
`;

export const Title = styled.div`
  margin-top: 8px;

  font-weight: 600;
  color: var(--white);
`;

export const Description = styled.div`
  margin-top: 8px;

  font-size: 14px;
  line-height: 18px;

  strong {
    font-weight: 900;
  }

  a {
    color: var(--text-link);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
