<<<<<<< HEAD
import { Text, View } from 'react-native';
import React from 'react';

const MyRoomScreen = () => (
  <View>
    <Text>MyRoomScreen</Text>
  </View>
);
=======
import React, { useEffect } from 'react';
import { Box, ScrollView } from 'native-base';
import { RefreshControl } from 'react-native';
import { selectRentingState, getRoomInfo } from 'store/reducer/renting';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'components/loading';
import CheckoutMenuItem from './Checkout';

const MyRoomScreen = () => {
  const dispatch = useDispatch();
  const { roomInfo } = useSelector(selectRentingState);
  const { loading, data } = roomInfo;
  useEffect(() => {
    dispatch(getRoomInfo());
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          onRefresh={() => dispatch(getRoomInfo())}
        />
      }
    >
      <Box
        alignItems='center'
        justifyContent='center'
        flex={1}
        width='full'
        marginTop='200px'
        px='4'
      >
        <CheckoutMenuItem data={data} />
      </Box >
    </ScrollView>
  )
}

>>>>>>> remotes/origin/ntb/checkout-when-renting

export default MyRoomScreen;
