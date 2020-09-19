import React, { useState, useCallback, useRef, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ReactTooltip from 'react-tooltip';
import Switch from 'react-switch';
import { Form } from '@unform/web';

import { CloseCircle, Add } from '@styled-icons/ionicons-solid';
import { QuestionCircleFill, Filter } from '@styled-icons/bootstrap';
import { Edit } from '@styled-icons/boxicons-regular';
import { DeleteForever } from '@styled-icons/material';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ConfirmModal from '../../../components/ConfirmModal';

import { Container, Filters, Table } from './styles';

import LayoutDefault from '../../../components/Layout/Default';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { useLoader } from '../../../hooks/loader';

interface ICategory {
  id: string;
  server_id: string;
  name: string;
  description: string;
  enabled: boolean;
  show_in_menu: boolean;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

const ListCategories: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast, toastMessages } = useToast();
  const { enableLoader, disableLoader, isLoading } = useLoader();

  const [data, setData] = useState<ICategory[]>([] as ICategory[]);
  const [filterNameField, setFilterNameField] = useState('');
  const [filteredData, setFilteredData] = useState<ICategory[]>(
    [] as ICategory[],
  );
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState<ICategory>(
    {} as ICategory,
  );
  const [fieldSelected, setFieldSelected] = useState('');
  const [checkedSelected, setCheckedSelected] = useState(false);

  const loadCategories = useCallback(() => {
    enableLoader();
    api
      .get('/categories?count=true')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Erro ao carregar',
          description:
            err.message_ptbr ||
            'Ocorreu um erro ao carregar as categorias, tente novamente.',
        });
      })
      .finally(() => {
        disableLoader();
      });
  }, [addToast, enableLoader, disableLoader]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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
    ReactTooltip.hide();
  }, [
    filteredData,
    isLoading,
    toastMessages,
    modalEditIsOpen,
    modalDeleteIsOpen,
  ]);

  const handleNewCategory = useCallback(() => {
    history.push('/categories/new');
  }, [history]);

  const handleEditCategoryPage = useCallback(
    (row) => {
      history.push(`/categories/edit?id=${row.id}`);
    },
    [history],
  );

  const openEditModal = useCallback((row, field, checked) => {
    setCategorySelected(row);
    setFieldSelected(field);
    setCheckedSelected(checked);
    setModalEditIsOpen(true);
  }, []);

  const openDeleteModal = useCallback((row) => {
    setCategorySelected(row);
    setModalDeleteIsOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setModalEditIsOpen(false);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalDeleteIsOpen(false);
  }, []);

  const acceptEditAction = useCallback(() => {
    closeEditModal();
    enableLoader();

    const updateData = {
      name: categorySelected.name,
      description: categorySelected.description,
      enabled: categorySelected.enabled,
      show_in_menu: categorySelected.show_in_menu,
      [fieldSelected]: checkedSelected,
    };

    api
      .put(`/categories/${categorySelected.id}`, updateData)
      .then(() => {
        loadCategories();
        addToast({
          type: 'success',
          title: 'Tudo certo :)',
          description: 'Categoria atualizada com sucesso.',
        });
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Algo deu errado :(',
          description:
            err.message_ptbr ||
            'Ocorreu um erro ao atualizar a categoria, tente novamente.',
        });
      });
  }, [
    addToast,
    categorySelected,
    checkedSelected,
    fieldSelected,
    closeEditModal,
    loadCategories,
    enableLoader,
  ]);

  const acceptDeleteAction = useCallback(() => {
    api
      .delete(`/categories/${categorySelected.id}`)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A categoria excluída definitivamente com sucesso!',
        });
      })
      .catch((err) => {
        addToast({
          type: 'error',
          title: 'Erro',
          description:
            err.message_ptbr ||
            'Ocorreu um erro ao deletar a categoria, tente novamente.',
        });
      })
      .finally(() => {
        closeDeleteModal();
        loadCategories();
      });
  }, [closeDeleteModal, categorySelected, loadCategories, addToast]);

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
      sortable: true,
    },
    {
      name: (
        <>
          <QuestionCircleFill
            className="header-icon"
            size={15}
            data-tip="Quantidade de comandos nessa categoria."
            data-place="top"
            data-multiline="true"
            data-background-color="black"
            data-text-color="white"
            data-border="white"
          />
          <span>Comandos</span>
        </>
      ),
      selector: 'commands_count',
      sortable: true,
      width: '150px',
      center: true,
    },
    {
      name: 'Atualizado por',
      selector: 'updated_by',
      sortable: true,
      width: '150px',
    },
    {
      name: (
        <>
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
          <span>Ativo</span>
        </>
      ),
      selector: 'enabled',
      center: true,
      width: '100px',
      cell: (row: ICategory) => (
        <span>
          <Switch
            id="enabled"
            onChange={(checked, _, id) => openEditModal(row, id, checked)}
            checked={row.enabled}
          />
        </span>
      ),
    },
    {
      name: (
        <>
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
          <span>Exibir no menu</span>
        </>
      ),
      selector: 'show_in_menu',
      center: true,
      width: '200px',
      cell: (row: ICategory) => (
        <span>
          <Switch
            id="show_in_menu"
            onChange={(checked, _, id) => openEditModal(row, id, checked)}
            checked={row.show_in_menu}
          />
        </span>
      ),
    },
    {
      name: '',
      width: '30px',
      cell: (row: ICategory) => (
        <span className="actions">
          <Edit
            className="edit"
            data-tip="Editar"
            data-background-color="black"
            data-text-color="white"
            data-border="white"
            data-place="bottom"
            size={26}
            onClick={() => handleEditCategoryPage(row)}
          />
          <DeleteForever
            className="delete"
            data-tip="Excluir"
            data-background-color="red"
            data-text-color="white"
            data-border="white"
            data-place="bottom"
            size={26}
            onClick={() => openDeleteModal(row)}
          />
        </span>
      ),
    },
  ];

  const paginationOptions = {
    noRowsPerPage: false,
    rowsPerPageText: 'Itens por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: false,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <LayoutDefault title="Lista Categorias">
      <Container>
        <Filters>
          <span>Filtrar por:</span>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              placeholder="Nome"
              name="name"
              containerStyle={{ width: '200px', height: '38px' }}
            />
            <Button className="clear-icon" onClick={handleClearFilters}>
              <CloseCircle size={25} />
            </Button>
            <Button className="filter" type="submit">
              Filtrar
              <Filter size={20} />
            </Button>
            <Button type="button" tp="action" onClick={handleNewCategory}>
              Nova
              <Add size={20} />
            </Button>
          </Form>
        </Filters>
        <Table>
          {!isLoading && (
            <DataTable
              className="tableStyle"
              columns={columns}
              data={filteredData}
              defaultSortField="name"
              theme="dark"
              highlightOnHover
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 50]}
              noHeader
              paginationComponentOptions={paginationOptions}
              noDataComponent="Nenhuma categoria encontrada!"
              onChangePage={() => ReactTooltip.rebuild()}
            />
          )}
        </Table>

        <ConfirmModal
          title={
            categorySelected && (
              <>
                {getMessageModal()}
                <strong>{categorySelected.name}</strong> ?
              </>
            )
          }
          isOpen={modalEditIsOpen}
          acceptAction={acceptEditAction}
          rejectAction={closeEditModal}
        />

        <ConfirmModal
          title={
            categorySelected && (
              <>
                <strong>CUIDADO:</strong> Deseja realmente deletar a
                categoria&nbsp;
                <strong>
                  <span>{categorySelected.name}</span>
                </strong>
                ?
                <br />
                <b>
                  TODOS os comandos dessa categoria serão exluídos, essa ação
                  não poderá ser revertida!
                </b>
              </>
            )
          }
          isOpen={modalDeleteIsOpen}
          acceptAction={acceptDeleteAction}
          rejectAction={closeDeleteModal}
        />
      </Container>
    </LayoutDefault>
  );
};

export default ListCategories;
