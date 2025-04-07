import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { ReactNode } from "react";

interface CustomModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  confirmText: string;
}

const CustomModal = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  title,
  confirmText,
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose} type="submit">
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
