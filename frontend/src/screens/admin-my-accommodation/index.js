import { AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Box, Center, Flex, Heading, HStack, Image, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useLayoutEffect } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccomodationByOwnerId } from 'store/reducer/accommodation';

const mapRoomStatusToText = (roomStatus) => {
  switch (roomStatus) {
    case 'AVAILABLE':
      return 'Còn trống';
    case 'RENTING':
      return 'Đã thuê';
    default:
      return 'Không xác định';
  }
};

const HeaderAdminMyAccomodation = ({ details }) => {
  const { width } = Dimensions.get('window');
  const countRentingRoom = details.rooms.filter((room) => room.status === 'RENTING').length;
  const countAvailableRoom = details.rooms.filter((room) => room.status === 'AVAILABLE').length;

  return (
    <VStack px={4} h="165px">
      <Center>
        <Image source={{ uri: details.thumbnail }} alt={details.name} size={width} position="absolute" />
      </Center>
      <VStack px={4} bg="#fff" py={2} borderRadius={12} height="3/4" zIndex={2} top={100}>
        <Center w="full" mb={4}>
          <Heading size="lg">{details.name}</Heading>
          <Text color="muted.500">
            {details.addressNumber}, {details.addressStreet}, {details.addressDistrict}
          </Text>
        </Center>
        <Flex justify="space-between" flexDir="row">
          <Text color="error.500">Đã thuê {countRentingRoom} phòng</Text>
          <Text color="tertiary.500">{countAvailableRoom} phòng còn trống</Text>
        </Flex>
      </VStack>
    </VStack>
  );
};

const AdminMyAccommodation = () => {
  const accommodation = useSelector((state) => state.accommodation);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(fetchAccomodationByOwnerId());
  }, [isFocused]);

  const details = accommodation.accommodationDetails;
  useLayoutEffect(() => {
    if (details.thumbnail) {
      navigation.setOptions({
        headerShown: true,
        headerTintColor: '#fff',
        header: () => <HeaderAdminMyAccomodation details={details} />,
      });
    
    }
    return () => {
      navigation.setOptions({
        headerShown: undefined,
        headerTintColor: undefined,
        header: undefined,
      })
    };
  }, [details])
  

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={accommodation.loading} onRefresh={() => dispatch(fetchAccomodationByOwnerId())} />}
      px={3.5}
      pb={24}
      zIndex={1}
    >
      <HStack pt={24} s mb={6} alignItems="center" justifyContent="space-between">
        <Text fontSize={20}>Phòng trọ của tôi</Text>
        <Pressable onPress={() => navigation.navigate('NewRoomForm')}>
          {({ isPressed, isHovered }) => (
            <Box bg={isPressed || isHovered ? 'muted.200' : 'transparent'}>
              <AntDesign name="pluscircle" size={24} color="#059669" />
            </Box>
          )}
        </Pressable>
      </HStack>
      <HStack flexWrap="wrap" space={2}>
        {details.rooms.map((room) => (
          <Pressable key={room.id} w="31%" onPress={() => navigation.navigate('NewRoomForm', { isEdit: true, room })}>
            <Center mb={2} alignItems="center" borderRadius={12} bg="#fff">
              <VStack alignItems="center" justifyContent="center" py={2.5} space={2}>
                <Box w={84} h={84} alignItems="center" justifyContent="center" bg="success.200" borderRadius="full">
                  <Text isTruncated noOfLines={1}>
                    {room.roomName}
                  </Text>
                </Box>
                <Text bold color="tertiary.600">
                  {mapRoomStatusToText(room.status)}
                </Text>
              </VStack>
            </Center>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
};

export default AdminMyAccommodation;
