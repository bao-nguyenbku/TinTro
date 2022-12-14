import React, { useState, useEffect } from 'react';
import { Text, useDisclose, Button, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { requestCheckoutRoom, selectRentingState, reset } from 'store/reducer/renting';

const CheckoutButton = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const { renting } = useSelector(selectRentingState);
  const { loading, action, isSuccess } = renting;
  const toast = useToast();
  const { onOpen, isOpen, onClose } = useDisclose();
  const [buttonProps, setButtonProps] = useState({
    action: 'REQUEST',
    title: 'Yêu cầu trả phòng',
  });
  useEffect(() => {
    if (data.status === 'CHECKOUT') {
      setButtonProps({
        action: 'CANCEL',
        title: 'Hủy yêu cầu trả phòng',
      });
    }
  }, [data.status]);
  useEffect(() => {
    if (isSuccess) {
      if (action === 'REQUEST') {
        setButtonProps({
          title: 'Hủy yêu cầu trả phòng',
          action: 'CANCEL',
        });
        toast.show({
          title: 'Yêu cầu trả phòng thành công',
          description: 'Vui lòng đợi chủ trọ xác nhận cho bạn',
          placement: 'top',
        });
      } else if (action === 'CANCEL') {
        setButtonProps({
          title: 'Yêu cầu trả phòng',
          action: 'REQUEST',
        });
        toast.show({
          title: 'Hủy yêu cầu thành công',
          placement: 'top',
        });
      }
    }
    return () => dispatch(reset());
  }, [isSuccess]);
  const onConfirm = () => {
    dispatch(requestCheckoutRoom({ rentingId: data.id, action: buttonProps.action }));
  };
  return (
    <>
      <TouchableOpacity
        style={{
          width: '100%',
        }}
      >
        <Button
          onPress={onOpen}
          bgColor={buttonProps.disable ? 'danger.600:alpha.60' : 'danger.600'}
          roundedTop="0"
          roundedBottom="2xl"
          p="5"
          w="full"
          alignItems="center"
          isLoading={loading}
          _pressed={{
            opacity: 0.8,
          }}
        >
          <Text color="white" fontWeight="700" fontSize="lg">
            {buttonProps.title}
          </Text>
        </Button>
      </TouchableOpacity>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        headerTitle="Xác nhận yêu cầu"
        content={buttonProps.action === 'REQUEST' ? 'Bạn có chắc chắn muốn trả phòng?' : 'Bạn chắc chắn muốn hủy yêu cầu này'}
        cancelTitle="Hủy"
        saveTitle="Đồng ý"
        onConfirm={onConfirm}
        status={CONFIRM_MODAL.DELETE}
      />
    </>
  );
};

export default CheckoutButton;
