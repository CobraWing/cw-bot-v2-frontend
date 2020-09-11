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

    input {
      padding-right: 20px;
    }
  }

  .clear-icon {
    position: absolute;
    left: 150px;
    top: 0;
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
  }

  .action {
    margin-left: 10px;
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

    .rdt_TableRow {
      position: relative;
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
