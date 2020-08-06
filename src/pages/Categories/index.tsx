import React, { useState, useCallback, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ReactTooltip from 'react-tooltip';
import Switch from 'react-switch';
import Modal from 'react-modal';
import { Form } from '@unform/web';

import { CloseCircle } from '@styled-icons/ionicons-solid';
import { Like, Dislike } from '@styled-icons/boxicons-solid';
import { QuestionCircleFill, Filter } from '@styled-icons/bootstrap';

import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Filters,
  Table,
  MyModal,
  MyModalHeader,
  CloseButton,
  MyModalContent,
} from './styles';

import LayoutDefault from '../../components/Layout/Default';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface ICategory {
  id: string;
  server_id: string;
  name: string;
  description: string;
  enabled: boolean;
  show_in_menu: boolean;
  created_at: string;
  updated_at: string;
}

const Categories: React.FC = () => {
  Modal.setAppElement('#root');

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [data, setData] = useState<ICategory[]>([] as ICategory[]);
  const [filterNameField, setFilterNameField] = useState('');
  const [filteredData, setFilteredData] = useState<ICategory[]>(
    [] as ICategory[],
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState<ICategory>(
    {} as ICategory,
  );
  const [fieldSelected, setFieldSelected] = useState('');
  const [checkedSelected, setCheckedSelected] = useState(false);

  useEffect(() => {
    api
      .get('/categories')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao carregar',
          description:
            'Ocorreu um erro ao carregar as categorias, tente novamente.',
        });
      });
  }, [addToast]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(filterNameField.toLowerCase()),
      ),
    );
  }, [filterNameField, data]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [filteredData]);

  const openModal = useCallback((row, field, checked) => {
    setCategorySelected(row);
    setFieldSelected(field);
    setCheckedSelected(checked);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSwitch = useCallback(() => {
    const newRow = {
      ...categorySelected,
      [fieldSelected]: checkedSelected,
    };
    setData([...data.filter((r) => r.id !== categorySelected.id), newRow]);
    closeModal();
  }, [categorySelected, checkedSelected, fieldSelected, data, closeModal]);

  const getMessageModal = useCallback(() => {
    let action = '';
    if (fieldSelected === 'enabled') {
      action = checkedSelected ? 'ativar' : 'desativar';
    } else {
      action = checkedSelected ? 'exibir no menu' : 'esconder do menu';
    }
    return `Deseja realmente ${action} a categoria `;
  }, [checkedSelected, fieldSelected]);

  const handleSubmit = useCallback((filterData) => {
    setFilterNameField(filterData.name);
  }, []);

  const handleClearFilters = useCallback(() => {
    formRef.current?.setFieldValue('name', '');
    setFilterNameField('');
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Descrição',
      selector: 'description',
    },
    {
      name: (
        <>
          <span>Ativo</span>
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
        </>
      ),
      selector: 'enabled',
      center: true,
      width: '100px',
      cell: (row: ICategory) => (
        <span>
          <Switch
            id="enabled"
            onChange={(checked, _, id) => openModal(row, id, checked)}
            checked={row.enabled}
          />
        </span>
      ),
    },
    {
      name: (
        <>
          <span>Exibir no menu</span>
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
        </>
      ),
      selector: 'show_in_menu',
      center: true,
      width: '200px',
      cell: (row: ICategory) => (
        <span>
          <Switch
            id="show_in_menu"
            onChange={(checked, _, id) => openModal(row, id, checked)}
            checked={row.show_in_menu}
          />
        </span>
      ),
    },
  ];

  const paginationOptions = {
    noRowsPerPage: true,
    rowsPerPageText: 'Itens por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: false,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <LayoutDefault>
      <Container>
        <Filters>
          <span>Filtrar por:</span>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              placeholder="Nome"
              name="name"
              containerStyle={{ width: '200px' }}
            />
            <Button className="clear" onClick={handleClearFilters}>
              <CloseCircle size={25} />
            </Button>
            <Button className="filter" type="submit">
              Filtrar
              <Filter size={20} />
            </Button>
          </Form>
        </Filters>
        <Table>
          <DataTable
            className="tableStyle"
            columns={columns}
            data={filteredData}
            defaultSortField="name"
            theme="dark"
            highlightOnHover
            pagination
            paginationPerPage={5}
            noHeader
            paginationComponentOptions={paginationOptions}
            noDataComponent="Nenhuma categoria encontrada!"
          />
        </Table>

        <MyModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <MyModalHeader>
            <span>Confirmação</span>
            <CloseButton type="button" onClick={closeModal}>
              <CloseCircle />
            </CloseButton>
          </MyModalHeader>
          <MyModalContent>
            <span>
              {categorySelected && (
                <>
                  {getMessageModal()}
                  <strong>{categorySelected.name}</strong> ?
                </>
              )}
            </span>
            <div>
              <Button tp="positive" onClick={handleSwitch}>
                Sim
                <Like size={22} />
              </Button>

              <Button tp="negative" onClick={closeModal}>
                Não
                <Dislike size={22} />
              </Button>
            </div>
          </MyModalContent>
        </MyModal>
      </Container>
    </LayoutDefault>
  );
};

export default Categories;
