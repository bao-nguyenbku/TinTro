import React from 'react'
import { Stack, Button, Modal, Text } from 'native-base';
import { CONFIRM_MODAL } from 'constants';
// @ts-nocheck
const ConfirmModal = (props) => {
  const { isOpen, onClose, onConfirm, headerTitle = 'Header title', content = 'body', cancelTitle = 'Hủy', saveTitle = 'Đồng ý', status = CONFIRM_MODAL.SUCCESS } = props;
  return <>
    <Stack direction={{
      base: "column",
      md: "row"
    }} space={2} />
    <Modal isOpen={isOpen} onClose={onClose} safeAreaTop size='full'>
      <Modal.Content maxWidth="400" center={{}}>
        <Modal.CloseButton />
        <Modal.Header>
          <Text>{headerTitle}</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{content}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              <Text>{cancelTitle}</Text>
            </Button>
            <Button 
              onPress={() => {
              onConfirm();
              onClose();
              }}
              bgColor={status}
            >
              <Text>{saveTitle}</Text>
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
};

export default ConfirmModal;

