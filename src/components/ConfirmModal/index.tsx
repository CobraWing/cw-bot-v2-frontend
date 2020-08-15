import React, { useCallback } from 'react';
import Modal from 'react-modal';

import { CloseCircle, Close } from '@styled-icons/ionicons-solid';
import { Check } from '@styled-icons/bootstrap';
import Button from '../Button';

import { MyModal, MyModalHeader, CloseButton, MyModalContent } from './styles';

interface ConfirmModalProps {
  title: React.ReactNode;
  isOpen: boolean;
  acceptAction(): void;
  rejectAction(): void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  isOpen,
  acceptAction,
  rejectAction,
}) => {
  Modal.setAppElement('#root');

  const reject = useCallback(() => {
    rejectAction();
  }, [rejectAction]);

  const accept = useCallback(() => {
    acceptAction();
  }, [acceptAction]);

  return (
    <MyModal
      isOpen={isOpen}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={false}
    >
      <MyModalHeader>
        <span>Confirmação</span>
        <CloseButton type="button" onClick={reject}>
          <CloseCircle />
        </CloseButton>
      </MyModalHeader>
      <MyModalContent>
        <span>{title}</span>
        <div>
          <Button tp="action" onClick={accept}>
            Sim
            <Check size={30} />
          </Button>

          <Button tp="negative" onClick={reject}>
            Não
            <Close size={25} />
          </Button>
        </div>
      </MyModalContent>
    </MyModal>
  );
};

export default ConfirmModal;
