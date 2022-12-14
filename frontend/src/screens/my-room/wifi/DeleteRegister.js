import React from 'react';
import { Button, Text, useDisclose } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';

const DeleteRegister = (props) => {
  const { onPress } = props;
  const disclose = useDisclose();
  return (
    <>
      <Button
        bgColor='danger.600'
        h='16'
        rounded='xl'
        onPress={() => disclose.onOpen()}
        _pressed={{
          opacity: 0.8
        }}
      >
        <Text color='white' fontWeight='700'>Hủy đăng ký</Text>
      </Button>
      <ConfirmModal 
          {...disclose}
          onConfirm={onPress}
          headerTitle='Xác nhận'
          content='Bạn có chắc chắn hủy đăng ký'
          status={CONFIRM_MODAL.DELETE}
      />
    </>
  )
}

export default DeleteRegister;