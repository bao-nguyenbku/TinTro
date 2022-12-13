import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { selectRentingState, getAllCheckoutRequest, acceptCheckoutRoom } from 'store/reducer/renting';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { ScrollView, VStack, Box, Text, useDisclose } from 'native-base';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';
import Loading from 'components/loading';
import SingleItem from './SingleItem';
import CheckoutRequestButton from './CheckoutRequestButton';

const AdminRequestCheckoutRoomScreen = (props) => {
  const { adminRenting } = useSelector(selectRentingState);
  const { loading, checkoutRequestList } = adminRenting;
  const bottomBarHeight = useBottomTabBarHeight();
  const disclose = useDisclose();
  const dispatch = useDispatch();
  const handleConfirm = (item) => {
    dispatch(acceptCheckoutRoom(item.id));
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
            return (
              <TouchableOpacity key={item.id} onPress={disclose.onOpen}>
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
          })}
        </VStack>
      </ScrollView>

      <CheckoutRequestButton {...props} />
    </Box>

  )
}

export default AdminRequestCheckoutRoomScreen;
