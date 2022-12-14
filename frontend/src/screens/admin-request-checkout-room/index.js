import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { selectRentingState, getAllCheckoutRequest, acceptCheckoutRoom, cancelRequestCheckoutByOwner } from 'store/reducer/renting';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { ScrollView, VStack, Box, Text, useDisclose } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';
import Loading from 'components/loading';
import SingleItem from './SingleItem';
import CheckoutRequestButton from './CheckoutRequestButton';

const isUserRequest = (data) => {
  return data.requestRole === 'USER';
}
const AdminRequestCheckoutRoomScreen = (props) => {
  const { adminRenting } = useSelector(selectRentingState);
  const { loading, checkoutRequestList } = adminRenting;
  const bottomBarHeight = useBottomTabBarHeight();
  const disclose = useDisclose();
  const dispatch = useDispatch();
  const handleConfirm = (item) => {
    dispatch(acceptCheckoutRoom(item.id));
  }
  const handleCancelCheckout = (item) => {
    dispatch(cancelRequestCheckoutByOwner(item.id));
  }
  useEffect(() => {
    dispatch(getAllCheckoutRequest());
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <Box flex={1} paddingBottom={bottomBarHeight + 20} p='4'>
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(getAllCheckoutRequest())}
          />
        }
      >
        <VStack
          space='2'
        >
          {checkoutRequestList && checkoutRequestList.length === 0 && (
            <Box flex={1} marginTop='3/4' justifyContent='center' alignItems='center'>
              <Text fontSize='xl'>Không có yêu cầu nào</Text>
            </Box>
          )}
          {checkoutRequestList && checkoutRequestList.map(item => {
            if (isUserRequest(item)) {
              return (
                <TouchableOpacity key={item.id} onPress={disclose.onOpen}
                  style={{
                    backgroundColor: '#fff'
                  }}
                >
                  <SingleItem
                    item={item}
                  />
                  <ConfirmModal
                    headerTitle='Xác nhận yêu cầu'
                    content='Vui lòng bấm xác nhận để trả phòng hoàn tất'
                    saveTitle='Đồng ý trả phòng'
                    onConfirm={() => handleConfirm(item)}
                    status={CONFIRM_MODAL.DELETE}
                    {...disclose}
                  />
                </TouchableOpacity>
              )
            }
            return (
              <TouchableOpacity key={item.id} onPress={disclose.onOpen}
              style={{
                backgroundColor: '#ffe4e6',
                borderRadius: 12
              }}>
                <SingleItem
                  item={item}
                />
                <ConfirmModal
                  headerTitle='Xác nhận'
                  content='Bạn chắc chắn muốn hủy yêu cầu'
                  saveTitle='Hủy yêu cầu'
                  cancelTitle='Thoát'
                  onConfirm={() => handleCancelCheckout(item)}
                  status={CONFIRM_MODAL.DELETE}
                  {...disclose}
                />
              </TouchableOpacity>
            )
          })}
        </VStack>
      </ScrollView>

      <CheckoutRequestButton {...props} />
    </Box>

  )
}

export default AdminRequestCheckoutRoomScreen;
