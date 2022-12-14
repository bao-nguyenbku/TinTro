import React, { useEffect } from 'react';
import { Box, Text, Button, useDisclose, isEmptyObj } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOwnerRequestCheckout, getRoomInfo, selectRentingState } from 'store/reducer/renting';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';
import Loading from 'components/loading';

const AcceptCheckoutFromAdmin = () => {
  const disclose = useDisclose();
  const dispatch = useDispatch();
  const { roomInfo } = useSelector(selectRentingState);
  const { loading, data } = roomInfo;
  useEffect(() => {
    dispatch(getRoomInfo());
  }, [])

  const onAcceptCheckout = () => {
    dispatch(acceptOwnerRequestCheckout(data.id));
  }
  if (loading) {
    return <Loading />
  }
  if (!isEmptyObj(data) && data.status === 'CHECKOUT' && data.requestRole === 'ADMIN') {
    return (
      <Box
        bgColor='amber.100'
        p='4'
      >
        <Text fontSize='lg' color='danger.600' textAlign='justify'>Chủ trọ đã yêu cầu bạn trả phòng. Nếu chưa rõ lý do, vui lòng liên hệ trực tiếp với chủ trọ</Text>
        <Text>Nếu bạn bấm &quot;<Text fontWeight='700'>Xác nhận</Text>&ldquo; đồng nghĩa bạn sẽ không được thuê phòng nữa.</Text>
        <Box
          marginTop='8'
        >
          <Button
            bgColor='danger.600'
            height='16'
            onPress={disclose.onOpen}
            _pressed={{
              opacity: 0.8
            }}
          >
            <Text color='white' fontWeight='700'>Xác nhận</Text>
          </Button>
        </Box>
        <ConfirmModal
          {...disclose}
          onConfirm={onAcceptCheckout}
          content='Bạn chắc chắn đồng ý?'
          headerTitle='Xác nhận yêu cầu'
          saveTitle='Vâng, tôi đồng ý!'
          status={CONFIRM_MODAL.DELETE}
        />
      </Box>
    )
  }
  return (
    <Box
      flex={1}
      alignItems='center'
      justifyContent='center'
    >
      <Text>Không có yêu cầu nào</Text>
    </Box>
  )
}

export default AcceptCheckoutFromAdmin;
