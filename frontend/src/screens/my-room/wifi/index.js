import React, { useEffect } from 'react';
import { Box, Text, ScrollView, VStack, isEmptyObj } from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useContainerHeight } from 'hooks/useContainerHeight';
import { selectWifiState, getWifiInfo } from 'store/reducer/wifi';
import Loading from 'components/loading';
import WifiInfo from './WifiInfo';
import WifiBill from './WifiBill';

const WifiScreen = (props) => {
  const { navigation, stack } = props;
  const containerHeight = useContainerHeight();
  const { wifi } = useSelector(selectWifiState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWifiInfo());
  }, [])
  useEffect(() => {
    if (isEmptyObj(wifi.data)) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate(stack.registerWifi.title)}
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
  }, [navigation, wifi.data, stack.registerWifi.title]);
  if (wifi.loading) {
    return <Loading />
  }
  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl
          refreshing={wifi.loading}
          onRefresh={() => dispatch(getWifiInfo())}
        />
      }
    >
      {isEmptyObj(wifi.data)
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
            <WifiInfo data={wifi.data} />
            <WifiBill data={wifi.data} />
          </VStack>
        )}
    </ScrollView>
  )
}

export default WifiScreen;
