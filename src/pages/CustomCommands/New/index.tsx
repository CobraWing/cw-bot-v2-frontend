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
import Select from '../../../components/Select';
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
  ContentContainer,
  BotAvatar,
  MessageInfos,
  UserName,
  BotName,
  BotTag,
  MessageBox,
  UserInfos,
  Title,
  MessageContentLeftContainer,
  MessageContentRightContainer,
  MessageContent,
  MessageThumb,
  MessageImage,
} from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import { useLoader } from '../../../hooks/loader';

interface CategorySelectData {
  value: string;
  label: string;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
  enabled: string;
  show_in_menu: string;
  updated_at: string;
}

interface CommandFormData {
  id?: string;
  category_id?: string;
  name?: string;
  title?: string;
  description?: string;
  content?: string;
  image_content?: string;
  image_thumbnail?: string;
  enabled?: boolean;
  show_in_menu?: boolean;
  created_at?: string;
  updated_at?: string;
}

const NewCustomCommand: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const { enableLoader, disableLoader } = useLoader();
  const [loadData, setLoadData] = useState<CommandFormData>(
    {} as CommandFormData,
  );
  const [refreshData, setRefreshData] = useState<CommandFormData>(
    {} as CommandFormData,
  );

  const [categoriesOptions, setCategoriesOptions] = useState<
    CategorySelectData[]
  >([]);

  const handleRefreshPreview = useCallback(() => {
    const formData = formRef.current?.getData() as CommandFormData;
    let { content } = formData;

    if (content) {
      let matchs = content.match(
        /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+/g,
      );

      if (matchs) {
        matchs = matchs.filter((m, index) => {
          return matchs?.indexOf(m) === index;
        });

        for (let i = 0; i < matchs.length; i += 1) {
          const link =
            matchs[i].includes('http://') || matchs[i].includes('https://')
              ? matchs[i]
              : `http://${matchs[i]}`;
          content = content.replace(
            new RegExp(matchs[i], 'gm'),
            `<a rel="noreferrer noopener" target="_blank" href="${link}">${matchs[i]}</a>`,
          );
        }
      }

      content = content
        .replace(/<\/p><p>/g, '<br/>')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '');
    }

    setRefreshData({
      ...formData,
      content,
    });
  }, []);

  const checkIfLoadCustomCommand = useCallback(
    (initializePromisses) => {
      if (location.pathname === '/custom-commands/edit') {
        if (!location.search.includes('?id=')) {
          addToast({
            type: 'error',
            title: 'Erro',
            description:
              'Ocorreu um erro ao abrir a pagina de edição, tente novamente.',
          });
          history.push('/custom-commands');
          return;
        }
        const id = location.search.replace('?id=', '');
        initializePromisses.push(api.get(`/customCommands/${id}`));
      }
    },
    [addToast, history, location.pathname, location.search],
  );

  useEffect(() => {
    enableLoader();
    const initializePromisses = [api.get('/categories')];

    checkIfLoadCustomCommand(initializePromisses);

    Promise.all(initializePromisses)
      .then((valuesResponse) => {
        const categories = valuesResponse[0].data;
        const customCommand = valuesResponse[1]?.data;

        setCategoriesOptions(
          categories.map((cat: CommandFormData) => {
            return {
              value: cat.id,
              label: cat.name,
            };
          }),
        );

        setLoadData(customCommand);
        formRef.current?.setData(customCommand);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro',
          description:
            'Ocorreu um erro carregar o comando customizado, tente novamente.',
        });
        history.push('/custom-commands');
      })
      .finally(() => {
        disableLoader();
      });
  }, [
    enableLoader,
    disableLoader,
    checkIfLoadCustomCommand,
    addToast,
    history,
  ]);

  const handleSubmit = useCallback(
    async (data: CommandFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          category_id: Yup.string().required(
            'O campo categoria é obrigatório.',
          ),
          name: Yup.string().required('O campo nome é obrigatório.'),
          description: Yup.string().required(
            'O campo descrição é obrigatório.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        if (loadData?.id) {
          delete loadData.created_at;
          delete loadData.updated_at;
          await api.put(`/customCommands/${loadData.id}`, data);
        } else {
          await api.post('/customCommands', data);
        }

        history.push('/custom-commands');

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'O comando customizado foi gravado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na criação',
          description:
            'Ocorreu um erro na criação do comando customizado, tente novamente.',
        });
      }
    },
    [addToast, history, loadData],
  );

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
              <Select
                label="Categoria: (campo obrigatório)"
                placeholder="Selecione a categoria"
                name="category_id"
                isSearchable
                options={categoriesOptions}
                isClearable
                noOptionsMessage={() => 'Nenhuma categoria encontrada'}
              />

              <Input
                label="Nome do comando: (sem a exclamação, campo obrigatório)"
                placeholder="Ex: comando_legal"
                name="name"
                maxLength={20}
                replaceWhiteSpaces
                replaceSpecialCharacters
              />

              <Input
                label="Descrição: (campo obrigatório)"
                placeholder="Ex: Esse comando retorna uma mensagem legal!"
                name="description"
                maxLength={100}
              />

              <Input
                label="Título:"
                placeholder="Ex: Título do comando legal"
                name="title"
                maxLength={50}
              />

              <Editor
                label="Conteúdo:"
                name="content"
                onChangeEvent={handleRefreshPreview}
              />

              <Input
                label="Imagem de conteúdo:"
                placeholder="Link da imagem"
                name="image_content"
                maxLength={1000}
              />

              <Input
                label="Imagem de thumb:"
                placeholder="Link da imagem"
                name="image_thumbnail"
                maxLength={1000}
              />

              <SwitchContainer>
                <div>
                  <QuestionCircleFill
                    className="header-icon"
                    size={15}
                    data-tip="Ativar / Desativar o comando.<br> Isso habilitará ou desabilitará o uso do comando."
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
                    data-tip="Exibir / Não exibir no menu.<br> Isso controla quando os comandos <br> são exibidos no menu de listagem da categoria."
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
            <p>
              <strong>Preview do Comando</strong>
            </p>

            <PreviewContainerBox>
              <BotAvatar src={user.avatar} alt={user.name} />
              <MessageInfos>
                <UserName>
                  <strong>{user.name}</strong>
                  <span className="time">Hoje às 16:20</span>
                </UserName>
                <span className="command">
                  !{refreshData.name || 'nome_do_comando'}
                </span>
              </MessageInfos>
            </PreviewContainerBox>

            <PreviewContainerBox>
              <BotAvatar
                src="https://cdn.discordapp.com/avatars/317331817315434496/84175210880cdeeb7faa5384cb3634ff.png?size=128"
                alt="CobraWingBot"
              />
              <MessageInfos>
                <BotName>
                  <strong>CobraWingBot</strong>
                  <BotTag>BOT</BotTag>
                  <span className="time">Hoje às 16:20</span>
                </BotName>
                <MessageBox>
                  <ContentContainer>
                    <MessageContentLeftContainer>
                      <UserInfos>
                        <img src={user.avatar} alt={user.name} />
                        <strong>{user.name}</strong>
                      </UserInfos>

                      <Title>{refreshData.title}</Title>

                      <MessageContent>
                        {ReactHtmlParser(refreshData?.content || '')}
                      </MessageContent>
                    </MessageContentLeftContainer>

                    {refreshData.image_thumbnail && (
                      <MessageContentRightContainer>
                        <MessageThumb
                          alt="Imagem com erro =("
                          src={refreshData.image_thumbnail}
                        />
                      </MessageContentRightContainer>
                    )}
                  </ContentContainer>

                  {refreshData.image_content && (
                    <MessageImage>
                      <img
                        alt="Imagem com erro =("
                        src={refreshData.image_content}
                      />
                    </MessageImage>
                  )}
                </MessageBox>
              </MessageInfos>
            </PreviewContainerBox>
          </PreviewContainer>
        </BodyContainer>
      </Container>
    </LayoutDefault>
  );
};

export default NewCustomCommand;
