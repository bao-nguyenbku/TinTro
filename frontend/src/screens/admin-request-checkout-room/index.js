import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { selectRentingState, getAllCheckoutRequest } from 'store/reducer/renting';
import { RefreshControl } from 'react-native';
import { ScrollView, VStack, Box, Text } from 'native-base';
import Loading from 'components/loading';
import SingleItem from './SingleItem';
import CheckoutRequestButton from './CheckoutRequestButton';

const AdminRequestCheckoutRoomScreen = (props) => {
  const { adminRenting } = useSelector(selectRentingState);
  const { loading, checkoutRequestList } = adminRenting;
  const bottomBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCheckoutRequest());
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <Box flex={1} paddingBottom={bottomBarHeight + 20}>
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
          p='2'
        >
          {checkoutRequestList && checkoutRequestList.length === 0 && (
            <Box flex={1} marginTop='3/4' justifyContent='center' alignItems='center'>
              <Text fontSize='xl'>Không có yêu cầu nào</Text>
            </Box>
          )}
          {checkoutRequestList && checkoutRequestList.map(item => {
            return (
              <SingleItem
                key={item.id}
                item={item}
              />
            )
          })}
        </VStack>
      </ScrollView>
      <CheckoutRequestButton {...props}/>
    </Box>

  )
}

export default AdminRequestCheckoutRoomScreen;
