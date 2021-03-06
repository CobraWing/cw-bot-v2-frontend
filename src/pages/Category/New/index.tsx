import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { Add } from '@styled-icons/ionicons-solid';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationError from '../../../utils/getValidationErrors';
import LayoutDefault from '../../../components/Layout/Default';
import Input from '../../../components/Input';
import Switch from '../../../components/Switch';
import Button from '../../../components/Button';

import {
  Container,
  TitleContainer,
  FormContainer,
  SwitchContainer,
  ButtonContainer,
} from './styles';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import { useLoader } from '../../../hooks/loader';

interface CategoryFormData {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  show_in_menu: boolean;
  updated_at?: string;
}

const NewCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();
  const { enableLoader, disableLoader } = useLoader();
  const [loadData, setLoadData] = useState<CategoryFormData>(
    {} as CategoryFormData,
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
      return;
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
    async (data: CategoryFormData) => {
      try {
        enableLoader();

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
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
          await api.put(`/categories/${loadData.id}`, data);
        } else {
          await api.post('/categories', data);
        }

        history.push('/categories');

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A categoria foi gravada com sucesso!',
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
            'Ocorreu um erro na criação da categoria, tente novamente.',
        });
      }
    },
    [addToast, history, loadData, enableLoader, disableLoader],
  );

  return (
    <LayoutDefault title={loadData?.id ? 'Editar Categoria' : 'Nova Categoria'}>
      <Container>
        <TitleContainer>
          <h3>{loadData?.id ? 'Editar categoria' : 'Nova categoria'}</h3>
        </TitleContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={loadData}>
            <Input
              label="Nome:"
              placeholder="Nome"
              name="name"
              maxLength={20}
              replaceWhiteSpaces
              replaceSpecialCharacters
            />

            <Input
              label="Descrição:"
              placeholder="Descrição"
              name="description"
              maxLength={50}
              tip="A descrição da categoria aparecerá <br>como dica no menu de ajuda no discord."
            />

            <SwitchContainer>
              <div>
                <QuestionCircleFill
                  className="header-icon"
                  size={15}
                  data-tip="Ativar / Desativar a categoria.<br> Desativando a categoria irá desativar todos os comandos nela."
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
      </Container>
    </LayoutDefault>
  );
};

export default NewCategory;
