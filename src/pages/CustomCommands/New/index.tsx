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
  updated_at?: string;
}

interface DefaultCategorySelectedData {
  value: string;
  label: string;
}

const NewCustomCommand: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const [defaultCategory, setDefaultCategory] = useState<
    DefaultCategorySelectedData
  >({} as DefaultCategorySelectedData);
  const { enableLoader, disableLoader } = useLoader();
  const [loadData, setLoadData] = useState<CommandFormData>({
    name: 'comando_legal',
    description: 'descrição do comando legal',
    content: '<p><strong>Esse é o comando legal</strong></p>',
  } as CommandFormData);
  const [refreshData, setRefreshData] = useState<CommandFormData>(
    {} as CommandFormData,
  );

  const [categoriesOptions, setCategoriesOptions] = useState<
    CategorySelectData[]
  >([]);

  // const loadCategories = useCallback(async () => {
  //   try {
  //     console.log('await category...');
  //     const categories = await api.get<CategoryData[]>('/categories');
  //     console.log('categories returned...', categories.data);
  //     setCategoriesOptions(
  //       categories.data.map((cat) => {
  //         return {
  //           value: cat.id,
  //           label: cat.name,
  //         };
  //       }),
  //     );
  //   } catch {
  //     addToast({
  //       type: 'error',
  //       title: 'Erro',
  //       description:
  //         'Ocorreu um erro carregar o comando customizado, tente novamente.',
  //     });
  //     history.push('/custom-commands');
  //   }
  // }, [addToast, history]);

  // const loadCustomCommand = useCallback(async () => {
  //   if (!location.search.includes('?id=')) {
  //     addToast({
  //       type: 'error',
  //       title: 'Erro',
  //       description:
  //         'Ocorreu um erro ao abrir a pagina de edição, tente novamente.',
  //     });
  //     history.push('/custom-commands');
  //     return;
  //   }
  //   const id = location.search.replace('?id=', '');

  //   try {
  //     console.log('await customCommand...');
  //     const customCommand = await api.get<CommandFormData>(
  //       `/customCommands/${id}`,
  //     );
  //     console.log('customCommand returned...', customCommand.data);
  //     setLoadData(customCommand.data);
  //     disableLoader();
  //   } catch {
  //     addToast({
  //       type: 'error',
  //       title: 'Erro',
  //       description:
  //         'Ocorreu um erro carregar o comando customizado, tente novamente.',
  //     });
  //     history.push('/custom-commands');
  //   }
  // }, [disableLoader, addToast, history, location.search]);

  const handleRefreshPreview = useCallback(() => {
    // console.log('formRef.current?.getData()', formRef.current?.getData());
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

  useEffect(() => {
    enableLoader();
    const initializePromisses = [api.get('/categories')];

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

    Promise.all(initializePromisses)
      .then((valuesResponse) => {
        const categories = valuesResponse[0].data;
        // const customCommand = valuesResponse[1]?.data;
        console.log(categories);
        // console.log(customCommand);

        setCategoriesOptions(
          categories.map((cat: CommandFormData) => {
            return {
              value: cat.id,
              label: cat.name,
            };
          }),
        );

        // setLoadData(customCommand);

        // setRefreshData(customCommand);
        // handleRefreshPreview();
        // formRef.current?.setFieldValue('content', customCommand.content);

        const categorySelected = categories.find(
          (c: CategoryData) => c.id === '13ce9720-3523-467b-893e-cf4fc0241196',
        );

        console.log('categorySelected', categorySelected);

        setDefaultCategory({
          value: categorySelected.id,
          label: categorySelected.name,
        });

        console.log(defaultCategory);

        setLoadData({
          name: 'Editado1',
          description: 'Editado2',
          content: '<p><strong>Editado3</strong> teste</p>',
          category_id: '13ce9720-3523-467b-893e-cf4fc0241196',
        });
        formRef.current?.setData({
          name: 'Editado1',
          description: 'Editado2',
          content: '<p><strong>Editado3</strong> teste</p>',
          category_id: '13ce9720-3523-467b-893e-cf4fc0241196',
        });
        // handleRefreshPreview();
        console.log(
          'Promise.all: formRef.current?.getData()',
          formRef.current?.getData(),
        );
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
    location.search,
    location.pathname,
    addToast,
    history,
  ]);

  const handleSubmit = useCallback(
    async (data: CommandFormData) => {
      console.log('data', data);
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

  // useEffect(() => {
  //   // console.log(
  //   //   'useEffect ===> formRef.current?.getData()',
  //   //   formRef.current?.getData(),
  //   // );
  //   handleRefreshPreview();
  // }, [handleRefreshPreview]);

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
                label="Categoria: (obrigatória)"
                placeholder="Selecione a categoria"
                name="category_id"
                isSearchable
                options={categoriesOptions}
                noOptionsMessage={() => 'Nenhuma categoria encontrada'}
              />

              <Input
                label="!Nome do comando: (obrigatório)"
                placeholder="Ex: !comandolegal"
                name="name"
                maxLength={20}
                replaceWhiteSpaces
                replaceSpecialCharacters
              />

              <Input
                label="Descrição: (obrigatório)"
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
                  <ContentContainer>
                    <MessageContentLeftContainer>
                      <UserInfos>
                        <img src={user.avatar} alt={user.name} />
                        <strong>{user.name}</strong>
                      </UserInfos>

                      <Title>{refreshData.title || 'Título'}</Title>

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
