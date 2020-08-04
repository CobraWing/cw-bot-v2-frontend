import React, { useState, useCallback, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ReactTooltip from 'react-tooltip';
import Switch from 'react-switch';
import Modal from 'react-modal';
import { Form } from '@unform/web';

import { CloseCircle } from '@styled-icons/ionicons-solid';
import { Like, Dislike } from '@styled-icons/boxicons-solid';
import { QuestionCircleFill } from '@styled-icons/bootstrap';

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
    const mockData = [
      {
        id: '13ce9720-3523-467b-893e-cf4fc0241196',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category com nome grande',
        description: 'description a',
        enabled: true,
        show_in_menu: true,
        created_at: '2020-07-10T02:45:34.596Z',
        updated_at: '2020-07-10T02:45:34.596Z',
      },
      {
        id: '7feab1f9-0de3-4497-a8cc-fc139cc70ce8',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category 2',
        description: 'description b',
        enabled: false,
        show_in_menu: true,
        created_at: '2020-07-10T03:01:22.018Z',
        updated_at: '2020-07-10T03:01:22.018Z',
      },
      {
        id: 'c29d2c25-d865-4621-8c40-f6b7d47eeaa7',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category 3',
        description: 'description c',
        enabled: true,
        show_in_menu: false,
        created_at: '2020-07-10T03:05:10.626Z',
        updated_at: '2020-07-10T03:05:10.626Z',
      },
      {
        id: 'c29d2c25-d865-4621-8c40-f6b7d47eeaa8',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category 4',
        description: 'description d',
        enabled: true,
        show_in_menu: false,
        created_at: '2020-07-10T03:05:10.626Z',
        updated_at: '2020-07-10T03:05:10.626Z',
      },
      {
        id: 'c29d2c25-d865-4621-8c40-f6b7d47eeaa9',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category 5',
        description: 'description e',
        enabled: true,
        show_in_menu: false,
        created_at: '2020-07-10T03:05:10.626Z',
        updated_at: '2020-07-10T03:05:10.626Z',
      },
      {
        id: 'c29d2c25-d865-4621-8c40-f6b7d47eea10',
        server_id: '3e734863-594e-4850-8c72-d69e520163c2',
        name: 'category 6',
        description: 'description f',
        enabled: true,
        show_in_menu: false,
        created_at: '2020-07-10T03:05:10.626Z',
        updated_at: '2020-07-10T03:05:10.626Z',
      },
    ];
    setData([...mockData]);
    setFilteredData([...mockData]);
  }, []);

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
          <span>Filtrar por nome:</span>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              containerStyle={{ width: '200px' }}
              onChange={() => formRef.current?.submitForm()}
            />
          </Form>
          <Button onClick={handleClearFilters}>Limpar</Button>
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
