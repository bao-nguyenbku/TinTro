import React, { useEffect } from 'react';
import { Box, Text, ScrollView, VStack, isEmptyObj } from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useContainerHeight } from 'hooks/useContainerHeight';
import { selectParkingState, getParkingInfo } from 'store/reducer/parking';
import Loading from 'components/loading';
import ParkingInfo from './ParkingInfo';
import ParkingBill from './ParkingBill';

const ParkingScreen = (props) => {
  const { navigation, stack } = props;
  const containerHeight = useContainerHeight();
  const { parking } = useSelector(selectParkingState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParkingInfo());
  }, [])
  useEffect(() => {
    if (isEmptyObj(parking.data)) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate(stack.registerParking.title)}
          >
            <Text color='white'>Đăng ký mới</Text>
          </TouchableOpacity>
        )
      });
    }
    return () => 
      navigation.setOptions({
        headerRight: undefined
      })
  }, [navigation, parking.data, stack.registerParking.title]);
  if (parking.loading) {
    return <Loading />
  }
  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl
          refreshing={parking.loading}
          onRefresh={() => dispatch(getParkingInfo())}
        />
      }
    >
      {isEmptyObj(parking.data)
        ? (
          <Box 
            flex={1} 
            alignItem='center' 
            justifyContent='center'
            marginX='auto'
            marginTop={Math.floor(containerHeight / 2)}
          >
            <Text>Không có thông tin đăng ký</Text>
          </Box>
        ) : (
          <VStack
            space='4'
            p='2'
          >
            <ParkingInfo data={parking.data} />
            <ParkingBill data={parking.data} />
          </VStack>
        )}
    </ScrollView>
  )
}

export default ParkingScreen
