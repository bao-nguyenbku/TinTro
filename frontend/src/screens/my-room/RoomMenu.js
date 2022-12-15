import React, { useEffect } from 'react';
import { Box, isEmptyObj, ScrollView, Text, VStack } from 'native-base';
import { TouchableOpacity, RefreshControl } from 'react-native';
import { selectRentingState, getRoomInfo } from 'store/reducer/renting';
import { useDispatch, useSelector } from 'react-redux';
import { useContainerHeight } from 'hooks/useContainerHeight';
import Loading from 'components/loading';
import { Ionicons } from '@expo/vector-icons';
import CheckoutButton from './Checkout';

const isUserRequest = (data) => {
  return data?.status === 'CHECKOUT' && data?.requestRole === 'USER';
};
const isAdminRequest = (data) => {
  return data?.status === 'CHECKOUT' && data?.requestRole === 'ADMIN';
};
const RoomMenu = ({ navigation, stack }) => {
  const menus = [
    {
      id: 1,
      title: 'Gửi xe',
      description: 'Thông tin gửi xe của bạn',
      icon: <Ionicons name="bicycle-outline" size={24} />,
      onPress: () => navigation.navigate(stack?.parking?.title),
    },
    {
      id: 2,
      title: 'Wifi',
      description: 'Thông tin wifi phòng của bạn',
      icon: <Ionicons name="wifi-outline" size={24} />,
      onPress: () => navigation.navigate(stack?.wifi?.title),
    },
  ];
  const dispatch = useDispatch();
  const { roomInfo } = useSelector(selectRentingState);
  const { loading, data } = roomInfo;
  const containerHeight = useContainerHeight();
  useEffect(() => {
    dispatch(getRoomInfo());
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView flex={1} refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(getRoomInfo())} />}>
      {isEmptyObj(data) ? (
        <Box flex={1} marginTop={Math.floor(containerHeight / 2)} alignItems="center" justifyContent="center" width="full">
          <Text>Bạn chưa thuê phòng nào</Text>
        </Box>
      ) : (
        <Box p="4">
          <Box alignItems="center" marginBottom="8">
            <Text fontSize="xl" fontWeight="700">
              Phòng {data?.room?.roomName}
            </Text>
            <Text>
              Tình trạng:{' '}
              {isAdminRequest(data) ? (
                <Text color="danger.600" fontWeight="700">
                  Chủ trọ yêu cầu trả phòng
                </Text>
              ) : (
                <Text color="tertiary.600" fontWeight="700">
                  Đang thuê
                </Text>
              )}
            </Text>
            {isUserRequest(data) && (
              <Box bgColor="danger.100" w="full" rounded="xl" py="8" marginTop="8" alignItems="center">
                <Text fontWeight="700" fontSize="lg" color="danger.600">
                  Bạn đã gửi yêu cầu trả phòng
                </Text>
              </Box>
            )}
          </Box>
          <VStack bgColor="white" p="4" marginTop="8" space="4" roundedTop="2xl" roundedBottom={isAdminRequest(data) ? 'xl' : 'none'}>
            {menus.map((menuItem) => {
              return (
                <TouchableOpacity key={menuItem.id} onPress={menuItem.onPress}>
                  <Box flexDirection="row" alignItems="center">
                    <Box bgColor="blueGray.200" rounded="full" w="10" h="10" alignItems="center" justifyContent="center">
                      {menuItem.icon}
                    </Box>
                    <Box marginLeft="2">
                      <Text fontWeight="700">{menuItem.title}</Text>
                      <Text color="muted.500">{menuItem.description}</Text>
                    </Box>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      style={{
                        marginLeft: 'auto',
                      }}
                    />
                  </Box>
                </TouchableOpacity>
              );
            })}
          </VStack>
          {isAdminRequest(data) ? <Box /> : <CheckoutButton data={data} />}
        </Box>
      )}
    </ScrollView>
  );
};

export default RoomMenu;
