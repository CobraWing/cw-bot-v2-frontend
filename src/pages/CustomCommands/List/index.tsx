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
import Select from '../../../components/Select';
import ConfirmModal from '../../../components/ConfirmModal';

import { Container, Filters, Table } from './styles';

import LayoutDefault from '../../../components/Layout/Default';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { useLoader } from '../../../hooks/loader';

interface ICategory {
  id: string;
  name: string;
}

interface ICustomCommand {
  id: string;
  category_id: string;
  category: ICategory;
  enabled: boolean;
  show_in_menu: boolean;
  name: string;
  description: string;
  title: string;
  color: string;
  created_at: string;
  updated_at: string;
  updated_by: string;
}

const ListCustomCommands: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast, toastMessages } = useToast();
  const { enableLoader, disableLoader, isLoading } = useLoader();

  const [data, setData] = useState<ICustomCommand[]>([] as ICustomCommand[]);
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
  const [filterNameField, setFilterNameField] = useState('');
  const [filterCategoryField, setFilterCategoryField] = useState('');
  const [filteredData, setFilteredData] = useState<ICustomCommand[]>(
    [] as ICustomCommand[],
  );
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [customCommandSelected, setCustomCommandSelected] = useState<
    ICustomCommand
  >({} as ICustomCommand);
  const [fieldSelected, setFieldSelected] = useState('');
  const [checkedSelected, setCheckedSelected] = useState(false);

  const loadInfos = useCallback(() => {
    enableLoader();

    const initializePromisses = [
      api.get('/categories'),
      api.get('/customCommands'),
    ];

    Promise.all(initializePromisses)
      .then((valuesResponse) => {
        const categoriesList = valuesResponse[0].data;
        categoriesList.push();
        setCategories(
          categoriesList.map((cat: ICategory) => {
            return {
              value: cat.id,
              label: cat.name,
            };
          }),
        );
        setData(valuesResponse[1]?.data);
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro ao carregar',
          description:
            'Ocorreu um erro ao carregar as comandos customizados, tente recarregar a página.',
        });
      })
      .finally(() => {
        disableLoader();
      });
  }, [addToast, enableLoader, disableLoader]);

  useEffect(() => {
    loadInfos();
  }, [loadInfos]);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(filterNameField.toLowerCase()) &&
          (filterCategoryField
            ? item.category_id === filterCategoryField
            : item.category_id !== null),
      ),
    );
  }, [filterNameField, filterCategoryField, data]);

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

  const handleNewCustomCommand = useCallback(() => {
    history.push('/custom-commands/new');
  }, [history]);

  const handleEditCustomCommandPage = useCallback(
    (row) => {
      history.push(`/custom-commands/edit?id=${row.id}`);
    },
    [history],
  );

  const openEditModal = useCallback((row, field, checked) => {
    setCustomCommandSelected(row);
    setFieldSelected(field);
    setCheckedSelected(checked);
    setModalEditIsOpen(true);
  }, []);

  const openDeleteModal = useCallback((row) => {
    setCustomCommandSelected(row);
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
      ...customCommandSelected,
      [fieldSelected]: checkedSelected,
    };

    delete updateData.id;
    delete updateData.category;
    delete updateData.created_at;
    delete updateData.updated_at;
    delete updateData.updated_by;

    api
      .put(`/customCommands/${customCommandSelected.id}`, updateData)
      .then(() => {
        loadInfos();
        addToast({
          type: 'success',
          title: 'Tudo certo :)',
          description: 'Comando atualizado com sucesso.',
        });
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Algo deu errado :(',
          description:
            'Ocorreu um erro ao atualizar o comando, tente novamente.',
        });
      });
  }, [
    addToast,
    customCommandSelected,
    checkedSelected,
    fieldSelected,
    closeEditModal,
    loadInfos,
    enableLoader,
  ]);

  const acceptDeleteAction = useCallback(() => {
    api
      .delete(`/categories/${customCommandSelected.id}`)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'A categoria excluída definitivamente com sucesso!',
        });
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Ocorreu um erro carregar categoria, tente novamente.',
        });
      })
      .finally(() => {
        closeDeleteModal();
        loadInfos();
      });
  }, [closeDeleteModal, customCommandSelected, loadInfos, addToast]);

  const getMessageModal = useCallback(() => {
    let action = '';
    if (fieldSelected === 'enabled') {
      action = checkedSelected ? 'ativar' : 'desativar';
    } else {
      action = checkedSelected ? 'exibir no menu' : 'esconder do menu';
    }
    return `Deseja realmente ${action} o comando `;
  }, [checkedSelected, fieldSelected]);

  const handleSubmit = useCallback((filterData) => {
    if (filterData.name) {
      setFilterNameField(filterData.name);
    }
    if (filterData.category_id) {
      setFilterCategoryField(filterData.category_id);
    }
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
      name: 'Categoria',
      selector: 'category.name',
      sortable: true,
      width: '150px',
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
            data-tip="Ativar / Desativar o comando.<br> Isso habilitará ou desabilitará o uso do comando."
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
      cell: (row: ICustomCommand) => (
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
            data-tip="Exibir / Não exibir no menu.<br> Isso controla quando os comandos <br> são exibidos no menu de listagem da categoria."
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
      cell: (row: ICustomCommand) => (
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
      cell: (row: ICustomCommand) => (
        <span className="actions">
          <Edit
            className="edit"
            data-tip="Editar"
            data-background-color="black"
            data-text-color="white"
            data-border="white"
            data-place="bottom"
            size={26}
            onClick={() => handleEditCustomCommandPage(row)}
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
    <LayoutDefault title="Listar Comandos Customizados">
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

            <Select
              placeholder="Selecione a categoria"
              name="category_id"
              isSearchable
              isClearable
              className="categories_select"
              options={categories}
              onChange={(value) => {
                if (!value) {
                  formRef.current?.setFieldValue('category_id', '');
                  setFilterCategoryField('');
                }
              }}
              noOptionsMessage={() => 'Nenhuma categoria encontrada'}
            />

            <Button className="filter" type="submit">
              Filtrar
              <Filter size={20} />
            </Button>
            <Button type="button" tp="action" onClick={handleNewCustomCommand}>
              Novo
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
              noDataComponent="Nenhum comando customizado encontrado!"
              onChangePage={() => ReactTooltip.rebuild()}
            />
          )}
        </Table>

        <ConfirmModal
          title={
            customCommandSelected && (
              <>
                {getMessageModal()}
                <strong>{customCommandSelected.name}</strong> ?
              </>
            )
          }
          isOpen={modalEditIsOpen}
          acceptAction={acceptEditAction}
          rejectAction={closeEditModal}
        />

        <ConfirmModal
          title={
            customCommandSelected && (
              <>
                CUIDADO, deseja realmente deletar o comando&nbsp;
                <strong>{customCommandSelected.name}</strong> ?<br />
                <strong>Essa ação não poderá ser revertida, CUIDADO!</strong>
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

export default ListCustomCommands;
