import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import ReactHtmlParser from 'react-html-parser';

import * as Yup from 'yup';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { Add } from '@styled-icons/ionicons-solid';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationError from '../../../utils/getValidationErrors';
import LayoutDefault from '../../../components/Layout/Default';
import Input from '../../../components/Input';
import Editor from '../../../components/Editor';
import Switch from '../../../components/Switch';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';

import {
  Container,
  TitleContainer,
  BodyContainer,
  FormContainer,
  SwitchContainer,
  ButtonContainer,
  PreviewContainer,
  PreviewContainerBox,
  BotAvatar,
  MessageInfos,
  BotName,
  BotTag,
  MessageBox,
  UserInfos,
  Title,
  Description,
} from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import { useLoader } from '../../../hooks/loader';

interface CommandFormData {
  id: string;
  name: string;
  title: string;
  description: string;
  enabled: boolean;
  show_in_menu: boolean;
  updated_at: string;
}

const NewCategory: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const { enableLoader, disableLoader } = useLoader();
  const [loadData, setLoadData] = useState<CommandFormData>({
    description: '<p><strong>teste strong</strong></p>',
  } as CommandFormData);
  const [refreshData, setRefreshData] = useState<CommandFormData>(
    {} as CommandFormData,
  );

  const loadCategory = useCallback(() => {
    if (!location.search.includes('?id=')) {
      addToast({
        type: 'error',
        title: 'Erro',
        description:
          'Ocorreu um erro ao abrir a pagina de edição, tente novamente.',
      });
      history.push('/categories');
    }
    const id = location.search.replace('?id=', '');

    enableLoader();

    api
      .get(`/categories/${id}`)
      .then((response) => {
        setLoadData(response.data);
        disableLoader();
      })
      .catch(() => {
        disableLoader();
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro carregar categoria, tente novamente.',
        });
        history.push('/categories');
      });
  }, [enableLoader, disableLoader, addToast, history, location.search]);

  useEffect(() => {
    if (location.pathname === '/categories/edit') {
      loadCategory();
    }
  }, [loadCategory, location.pathname]);

  const handleSubmit = useCallback(
    async (data: CommandFormData) => {
      console.log('data', data);
      // try {
      //   formRef.current?.setErrors({});

      //   const schema = Yup.object().shape({
      //     name: Yup.string().required('O campo nome é obrigatório.'),
      //     description: Yup.string().required(
      //       'O campo descrição é obrigatório.',
      //     ),
      //   });

      //   await schema.validate(data, {
      //     abortEarly: false,
      //   });
      //   if (loadData?.id) {
      //     delete loadData.updated_at;
      //     await api.put(`/categories/${loadData.id}`, data);
      //   } else {
      //     await api.post('/categories', data);
      //   }

      //   history.push('/categories');

      //   addToast({
      //     type: 'success',
      //     title: 'Sucesso!',
      //     description: 'A categoria foi gravada com sucesso!',
      //   });
      // } catch (err) {
      //   if (err instanceof Yup.ValidationError) {
      //     const errors = getValidationError(err);

      //     formRef.current?.setErrors(errors);

      //     return;
      //   }

      //   addToast({
      //     type: 'error',
      //     title: 'Erro na criação',
      //     description:
      //       'Ocorreu um erro na criação da categoria, tente novamente.',
      //   });
      // }
    },
    [addToast, history, loadData],
  );

  const handleRefreshPreview = useCallback(() => {
    console.log('formRef.current?.getData()', formRef.current?.getData());
    const formData = formRef.current?.getData() as CommandFormData;
    let { description } = formData;

    const matchs = description.match(
      /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/g,
    );
    if (matchs) {
      for (let i = 0; i < matchs.length; i += 1) {
        description = description.replace(
          matchs[i],
          `<a href="${matchs[i]}">${matchs[i]}</a>`,
        );
      }
    }

    setRefreshData({
      ...formData,
      description: description
        .replace(/<\/p><p>/g, '<br/>')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, ''),
    });
  }, []);

  return (
    <LayoutDefault
      title={
        loadData?.id ? 'Editar Comando Customizado' : 'Novo Comando Customizado'
      }
    >
      <Container>
        <TitleContainer>
          <h3>
            {loadData?.id
              ? 'Editar Comando Customizado'
              : 'Novo Comando Customizado'}
          </h3>
        </TitleContainer>

        <BodyContainer>
          <FormContainer>
            <Form
              ref={formRef}
              onChange={handleRefreshPreview}
              onSubmit={handleSubmit}
              initialData={loadData}
            >
              <Input
                label="Nome do comando:"
                placeholder="Nome do comando"
                name="name"
                maxLength={20}
                replaceWhiteSpaces
                replaceSpecialCharacters
              />

              <Input
                label="Título:"
                placeholder="Título"
                name="title"
                maxLength={50}
              />

              <Editor
                label="Descrição:"
                name="description"
                onChangeEvent={handleRefreshPreview}
              />

              <SwitchContainer>
                <div>
                  <QuestionCircleFill
                    className="header-icon"
                    size={15}
                    data-tip="Ativar / Desativar a categoria.<br> Isso afetará todos os comandos nessa categoria."
                    data-place="top"
                    data-multiline="true"
                    data-background-color="black"
                    data-text-color="white"
                    data-border="white"
                  />
                  <Switch label="Ativo:" name="enabled" />
                </div>
                <div>
                  <QuestionCircleFill
                    className="header-icon"
                    size={15}
                    data-tip="Exibir / Não exibir no menu.<br> Isso controla quando os comandos <br> nessa categoria são exibidos no menu."
                    data-place="top"
                    data-multiline="true"
                    data-background-color="black"
                    data-text-color="white"
                    data-border="white"
                  />
                  <Switch label="Exibir no menu:" name="show_in_menu" />
                </div>
              </SwitchContainer>

              <ButtonContainer>
                <Button type="submit" tp="action">
                  Salvar
                  <Add size={20} />
                </Button>
              </ButtonContainer>
            </Form>
          </FormContainer>

          <PreviewContainer>
            <p>Preview do comando</p>
            <PreviewContainerBox>
              <BotAvatar
                src="https://cdn.discordapp.com/avatars/317331817315434496/84175210880cdeeb7faa5384cb3634ff.png?size=128"
                alt="CobraWingBot"
              />
              <MessageInfos>
                <BotName>
                  <strong>CobraWingBot</strong>
                  <BotTag>BOT</BotTag>
                  <span>Hoje às 16:20</span>
                </BotName>
                <MessageBox>
                  <UserInfos>
                    <img src={user.avatar} alt={user.name} />
                    <strong>{user.name}</strong>
                  </UserInfos>

                  <Title>{refreshData.title || 'Título'}</Title>

                  <Description>
                    {ReactHtmlParser(refreshData.description)}
                  </Description>
                </MessageBox>
              </MessageInfos>
            </PreviewContainerBox>
          </PreviewContainer>
        </BodyContainer>
      </Container>
    </LayoutDefault>
  );
};

export default NewCategory;
