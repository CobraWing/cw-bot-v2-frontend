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

const NewCategory: React.FC = () => {
  const { user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const { enableLoader, disableLoader } = useLoader();
  const [loadData, setLoadData] = useState<CommandFormData>({
    title: 'Fits para Krait MKII',
    content:
      '<p><strong>[01] PVE</strong> - Krait MKII para PVE -</p><p>01A - https://s.orbis.zone/4n98 - por Cmdr CyberTX.</p><p></p><p><strong>[02] PVP</strong> - Krait MKII para PVP -</p><p>02A - Não disponivel ainda.</p><p></p><p><strong>[03] Multipropósito</strong> - Krait MKII para uso misto -</p><p>03A - https://s.orbis.zone/4n99 - por Cmdr CyberTX.</p><p></p><p><strong>[04] Exploração</strong> - Krait MKII para exploração -</p><p>04A - https://s.orbis.zone/4n9b - por Cmdr CyberTX.</p><p></p><p><strong>[05] Transporte</strong> - Krait MKII para transporte de cargas -</p><p>05A - https://s.orbis.zone/4n9h - por Cmdr CyberTX.</p><p></p><p><strong>[06] Passageiro</strong> - Krait MKII para transporte de passageiros -</p><p>06A - https://s.orbis.zone/4n9i - por Cmdr CyberTX.</p><p></p><p><strong>[07] Mineração</strong> - Krait MKII para mineração -</p><p>07A - Não disponivel ainda.</p><p></p><p><strong>[08] Pirataria</strong> - Krait MKII para pirataria -</p><p>08A - Não disponivel ainda.</p><p></p><p><strong>[09] Thargoid</strong> - Krait MKII para combate AX -</p><p>09A - Não disponivel ainda.</p><p></p><p><strong>[10] Velocidade</strong> - Krait MKII com foco em velocidade -</p><p>10A - https://s.orbis.zone/4n9g - por Cmdr CyberTX.</p><p></p><p><strong>Importante:</strong> Os fits da Cobra Wing são apenas sugestões.</p>',
    image_content:
      'https://cdn.discordapp.com/attachments/575275169636024320/575279710792187932/Krait_Mk_II.gif',
    image_thumbnail:
      'https://cdn.discordapp.com/attachments/575275169636024320/575279710792187932/Krait_Mk_II.gif',
  } as CommandFormData);
  const [refreshData, setRefreshData] = useState<CommandFormData>(
    {} as CommandFormData,
  );

  const [categoriesOptions, setCategoriesOptions] = useState<
    CategorySelectData[]
  >([]);

  const loadCategories = useCallback(() => {
    api
      .get<CategoryData[]>('/categories')
      .then((response) => {
        setCategoriesOptions(
          response.data.map((category) => {
            return {
              value: category.id,
              label: category.name,
            };
          }),
        );
        disableLoader();
      })
      .catch(() => {
        disableLoader();
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro carregar as categorias.',
        });
        history.push('/categories');
      });
  }, [disableLoader, addToast, history]);

  useEffect(() => {
    enableLoader();
    loadCategories();
  }, [enableLoader, loadCategories]);

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
    // console.log(
    //   'useEffect ===> formRef.current?.getData()',
    //   formRef.current?.getData(),
    // );
    handleRefreshPreview();
  }, [handleRefreshPreview]);

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
                name="test"
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

export default NewCategory;
