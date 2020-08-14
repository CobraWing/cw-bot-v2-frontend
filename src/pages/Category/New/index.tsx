import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import LayoutDefault from '../../../components/Layout/Default';
import Input from '../../../components/Input';
import TextArea from '../../../components/TextArea';
import Switch from '../../../components/Switch';
import Button from '../../../components/Button';

import { Container } from './styles';

const NewCategory: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((filterData) => {
    console.log(filterData);
  }, []);

  return (
    <LayoutDefault>
      <Container>
        <h2>Adicionar uma nova categoria</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            label="Nome:"
            placeholder="Nome"
            name="name"
            containerStyle={{ width: '400px' }}
          />

          <TextArea
            label="Descrição:"
            placeholder="Descrição"
            name="description"
            containerStyle={{ width: '400px' }}
          />

          <Switch
            label="Ativo:"
            name="enabled"
            containerStyle={{ width: '400px' }}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </LayoutDefault>
  );
};

export default NewCategory;
