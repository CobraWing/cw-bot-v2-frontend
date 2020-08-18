import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { Add } from '@styled-icons/ionicons-solid';
import { useHistory } from 'react-router-dom';
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

interface CategoryFormData {
  name: string;
  description: string;
  enabled: boolean;
  show_in_menu: boolean;
}

const NewCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CategoryFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O nome obrigatório.'),
          description: Yup.string().required('A descrição é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/categories', data);

        history.push('/categories');

        addToast({
          type: 'success',
          title: 'Categoria criada!',
          description: 'A categoria foi criada com sucesso!',
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
            'Ocorreu um erro na criação da categoria, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <LayoutDefault>
      <Container>
        <TitleContainer>
          <h3>Nova categoria</h3>
        </TitleContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              label="Nome:"
              placeholder="Nome"
              name="name"
              maxLength={20}
            />

            <Input
              label="Descrição:"
              placeholder="Descrição"
              name="description"
              maxLength={50}
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
                Adicionar
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
