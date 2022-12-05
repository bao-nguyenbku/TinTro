import React, { useState } from 'react'
import { Stack, Button, Modal, Text } from 'native-base';
// @ts-nocheck
const ConfirmModal = (props) => {
  const { isOpen, onOpen, onClose, onConfirm, headerTitle = 'Header title', content = 'body', cancelTitle = 'Cancel', saveTitle = 'Save' } = props;

  return <>
    <Stack direction={{
      base: "column",
      md: "row"
    }} space={2} />
    <Modal isOpen={isOpen} onClose={onClose} safeAreaTop size='full'>
      <Modal.Content maxWidth="400" center={{}}>
        <Modal.CloseButton />
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Body>
          <Text>{content}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              {cancelTitle}
            </Button>
            <Button 
              onPress={() => {
              onConfirm();
              onClose();
              }}
              bgColor='tertiary.600'
            >
              {saveTitle}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  </>;
};

export default ConfirmModal;

