import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { Add } from '@styled-icons/ionicons-solid';
import LayoutDefault from '../../../components/Layout/Default';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Switch from '../../../components/Switch';
import Button from '../../../components/Button';

import {
  Container,
  TitleContainer,
  FormContainer,
  SwitchContainer,
  ButtonContainer,
} from './styles';

const NewCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((filterData) => {
    console.log(filterData);
  }, []);

  const data = {
    name: 'name teste',
    description: 'description teste',
    enabled: true,
    show_in_menu: false,
  };

  return (
    <LayoutDefault>
      <Container>
        <TitleContainer>
          <h3>Nova categoria</h3>
        </TitleContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
            <Input label="Nome:" placeholder="Nome" name="name" />

            <TextArea
              label="Descrição:"
              placeholder="Descrição"
              name="description"
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
              <Button type="submit">
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
