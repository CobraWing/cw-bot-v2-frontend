/* eslint-disable no-param-reassign */
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

interface ChannelSelectData {
  value: string;
  label: string;
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
  channel_limited?: boolean;
  channel_whitelist?: string;
}

const NewCustomCommand: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const { enableLoader, disableLoader } = useLoader();
  const [necessaryContentParts, setNecessaryContentParts] = useState(0);
  const [toggleChannels, setToggleChannels] = useState(false);
  const [loadData, setLoadData] = useState<CommandFormData>({
    channel_limited: false,
  } as CommandFormData);
  const [refreshData, setRefreshData] = useState<CommandFormData>(
    {} as CommandFormData,
  );

  const [categoriesOptions, setCategoriesOptions] = useState<
    CategorySelectData[]
  >([]);

  const [channelOptions, setChannelOptions] = useState<ChannelSelectData[]>([]);

  const getContent = useCallback(() => {
    const formData = formRef.current?.getData() as CommandFormData;
    const { content } = formData;
    let contentData = '';

    if (content) {
      contentData = content
        .replace(/<\/p><p>/g, '\n')
        .replace(/<strong>|<\/strong>/g, '**')
        .replace(/<del>|<\/del>/g, '~~')
        .replace(/<u>|<\/u>/g, '__')
        .replace(/<em>|<\/em>/g, '*')
        .replace(/<p>|<\/p>/g, '')
        .replace(/http:\/\/www\.|https:\/\/www\./g, 'www.')
        .replace(/www\./g, 'https://www.')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    }

    return contentData;
  }, []);

  const handleRefreshPreview = useCallback(() => {
    const formData = formRef.current?.getData() as CommandFormData;
    let { content } = formData;
    const contentLength = getContent().length;

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
        .replace(/<\/p>/g, '')
        .replace(/&lt;\/&gt;/g, '========= quebra de comando =========');
    }
    setNecessaryContentParts(Math.floor(contentLength / 2040));

    setRefreshData({
      ...formData,
      content,
    });
  }, [getContent]);

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
    const initializePromisses = [api.get('/categories'), api.get('/channels')];

    checkIfLoadCustomCommand(initializePromisses);

    Promise.all(initializePromisses)
      .then((valuesResponse) => {
        const categories = valuesResponse[0].data;
        const channels = valuesResponse[1].data;
        const customCommand = valuesResponse[2]?.data;

        setCategoriesOptions(
          categories.map((cat: CommandFormData) => {
            return {
              value: cat.id,
              label: cat.name,
            };
          }),
        );

        setChannelOptions(channels);
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
        enableLoader();
        const contentParts = getContent().split('</>').length - 1;

        if (contentParts < necessaryContentParts) {
          disableLoader();
          addToast({
            type: 'error',
            title: 'Conteúdo muito extenso...',
            description: `Insira ${necessaryContentParts} tag </> entre o
            conteúdo no local desejado, para fazer a quebra no comando final.`,
          });
          return;
        }

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          category_id: Yup.string().required(
            'O campo categoria é obrigatório.',
          ),
          name: Yup.string().required('O campo nome é obrigatório.'),
          description: Yup.string().required(
            'O campo descrição é obrigatório.',
          ),
          channel_whitelist: Yup.array().when('channel_limited', {
            is: true,
            then: (fieldSchema: any) =>
              fieldSchema.required('O campo canais é obrigatório'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.channel_whitelist = data.channel_whitelist
          ? JSON.stringify(data.channel_whitelist)
          : data.channel_whitelist;

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
        disableLoader();

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Algo deu errado :(',
          description:
            err.message_ptbr ||
            'Ocorreu um erro na criação do comando customizado, tente novamente.',
        });
      }
    },
    [
      addToast,
      history,
      loadData,
      enableLoader,
      disableLoader,
      getContent,
      necessaryContentParts,
    ],
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
                tip="A categoria server como agrupador de comandos,<br> facilitando encontrar no menu de ajuda."
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
                tip="A descrição do comando aparecerá <br>como dica no menu de ajuda no discord."
              />

              <Switch
                label="Limitar o comando por canais?"
                name="channel_limited"
                callback={(value) => {
                  setToggleChannels(value);
                  if (loadData) loadData.channel_limited = value;
                }}
              />

              {toggleChannels && (
                <Select
                  label="Quais canais? (selecione um ou mais):"
                  placeholder="Selecione os canais"
                  name="channel_whitelist"
                  isSearchable
                  options={channelOptions}
                  isMulti
                  isClearable
                  noOptionsMessage={() => 'Nenhum canal encontrada'}
                />
              )}

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

              {necessaryContentParts > 0 && (
                <div className="warn-wrap">
                  <span>
                    <strong>ATENÇÃO:</strong> O Discord tem um limite de 2048
                    caracteres e o texto do conteúdo está muito extenso.
                  </span>
                  <br />
                  <span>
                    Insira <strong>{necessaryContentParts}</strong> tag
                    <strong>{' </>'}</strong> entre o conteúdo no local
                    desejado, para fazer a quebra no comando final.
                  </span>
                  <br />
                  <br />
                </div>
              )}

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
                    data-tip="Ativar / Desativar o comando.<br> Isso desativará o uso do comando."
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
