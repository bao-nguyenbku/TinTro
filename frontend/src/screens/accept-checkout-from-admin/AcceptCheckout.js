import React from 'react';
import { useDisclose, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { CONFIRM_MODAL } from 'constants';
import ConfirmModal from 'components/confirm-modal';

const AcceptCheckout = (props) => {
  const disclose = useDisclose();
  const { onConfirm } = props;
  return (
    <>
      <TouchableOpacity
        style={{
          width: '100%',
        }}
      >
        <Button
          onPress={disclose.onOpen}
          p="5"
          roundedRight='xl'
          roundedLeft={0}
          bgColor='danger.600'
          alignItems="center"
          _pressed={{
            opacity: 0.8,
          }}
        >
          <Text color="white" fontWeight="700" fontSize="lg">
            Đồng ý
          </Text>
        </Button>
      </TouchableOpacity>
      <ConfirmModal
        {...disclose}
        headerTitle="Xác nhận yêu cầu"
        content='Nếu đồng ý, bạn sẽ không được thuê phòng này nữa'
        cancelTitle="Hủy"
        saveTitle="Đồng ý"
        onConfirm={onConfirm}
        status={CONFIRM_MODAL.DELETE}
      />
    </>
  )
}

export default AcceptCheckout;
