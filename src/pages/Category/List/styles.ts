import styled from 'styled-components';

export const Container = styled.div`
  grid-area: CENTER;
  grid-column: span 3;

  padding: 25px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 20px;

  Form {
    margin-left: 10px;
    display: flex;
    position: relative;
    align-items: center;

    input {
      padding-right: 20px;
    }
  }

  .clear-icon {
    position: absolute;
    left: 147px;
    top: 4px;
    background: transparent;
    border: 0;
    color: var(--gray);
    transition: color 0.2s;

    &:hover {
      color: var(--white);
    }
  }

  .filter {
    margin-left: 10px;
    width: 110px;
  }

  .action {
    margin-left: 10px;
    width: 110px;
  }
`;

export const Table = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 15px;

  .header-icon {
    margin-right: 5px;
  }

  .tableStyle {
    overflow-x: hidden;

    .rdt_TableHeadRow,
    .rdt_TableRow,
    .rdt_Pagination {
      background: var(--quaternary);
    }

    .rdt_Pagination {
      select option {
        background: var(--quaternary);
        color: var(--white);
        border: 1px solid #000;
      }
    }

    .rdt_TableRow {
      position: relative;
      transition: background 0.2s;
      &:hover {
        background: var(--secondary);
      }

      .actions {
        display: flex;
        position: absolute;
        right: -100px;
        opacity: 0;
        transition: opacity 0.3s linear, right 0.1s;

        svg {
          cursor: pointer;
          transition: color 0.3s;

          &.delete:hover {
            color: var(--button-danger);
          }

          &.edit:hover {
            color: var(--button-positive);
          }
        }

        svg + svg {
          margin-left: 10px;
        }
      }

      &:hover {
        .actions {
          opacity: 0.8;
          right: 10px;
        }
      }
    }
  }
`;
