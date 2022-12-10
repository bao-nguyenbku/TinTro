import React, { useState, useEffect } from 'react';
import { Box, Text, useDisclose, Button, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';
import { useDispatch, useSelector } from 'react-redux';
import { requestCheckoutRoom, selectRentingState, reset } from 'store/reducer/renting';
import CustomToast from 'components/custom-toast';

const CheckoutButton = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const { renting } = useSelector(selectRentingState);
  const { loading, isSuccess } = renting;
  const toast = useToast();
  const { onOpen, isOpen, onClose } = useDisclose();
  const [buttonProps, setButtonProps] = useState({
    disable: false,
    title: 'Yêu cầu trả phòng'
  })
  useEffect(() => {
    if (data.status === 'CHECKOUT') {
      setButtonProps({
        disable: true,
        title: 'Hủy yêu cầu trả phòng'
      })
    }
  }, [])
  
  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess) {
      setButtonProps({
        title: 'Hủy yêu cầu trả phòng',
        disable: true
      })
      toast.show({
        title: 'Yêu cầu trả phòng thành công',
        description: 'Vui lòng đợi chủ trọ xác nhận cho bạn',
        placement: 'top'
      })
    }
    return () => 
      dispatch(reset())
  }, [isSuccess])
  const onConfirm = () => {
    dispatch(requestCheckoutRoom({ rentingId: data.id }));
  }
  return (
    <>
      <TouchableOpacity
        style={{
          width: '100%'
        }}
      >
        <Button
          onPress={onOpen}
          bgColor={buttonProps.disable ? 'danger.600:alpha.60' : 'danger.600'}
          rounded='xl'
          p='5'
          w='full'
          alignItems='center'
          isLoading={loading}
          disabled={buttonProps.disable}
          _pressed={{
            opacity: 0.8
          }}
        >
          <Text color='white' fontWeight='700' fontSize='lg'>{buttonProps.title}</Text>
        </Button>
      </TouchableOpacity>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        headerTitle='Xác nhận yêu cầu'
        content='Bạn có chắc chắn muốn trả phòng?'
        cancelTitle='Hủy'
        saveTitle='Trả phòng'
        onConfirm={onConfirm}
        status={CONFIRM_MODAL.DELETE}
      />
    </>
  )
}

export default CheckoutButton;
