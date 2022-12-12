import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Loading from 'components/loading';
import { Avatar, Button, Center, Heading, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getRentRequestsAdmin } from 'store/reducer/accommodation';
import { formatDate } from 'utils/formatDate';

const UserRequestCard = ({ id, name, phone, createdAt, avatar, navigation }) => {
  return (
    <VStack bg="#fff" space={6} px={3} py={4}>
      <HStack justifyContent="space-between">
        <HStack space={3}>
          <Avatar source={{ uri: avatar }} />
          <VStack>
            <Heading fontSize={16} bold>
              {name}
            </Heading>
            <Text fontSize={14} color="muted.500">
              {phone}
            </Text>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" space={3} alignItems="center">
          <Pressable
            onPress={() => {
              navigation.getParent().navigate('Message', {
                screen: 'SendMessage',
                params: {
                  fromId: id,
                  avatar,
                  name,
                  initial: false,
                },
              });
            }}
          >
            {({ isPressed }) => (
              <Center w={42} h={42} borderRadius={12} bg={isPressed ? '#fff' : 'warmGray.100'}>
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#737373" />
              </Center>
            )}
          </Pressable>
          <Pressable onPress={() => {}}>
            {({ isPressed }) => (
              <Center w={42} h={42} borderRadius={12} bg={isPressed ? '#fff' : 'warmGray.100'}>
                <Ionicons name="call" size={24} color="#737373" />
              </Center>
            )}
          </Pressable>
        </HStack>
      </HStack>

      <HStack justifyContent="space-between">
        <VStack>
          <Text color="muted.500">Đã yêu cầu lúc:</Text>
          <Text color="muted.500">{formatDate(createdAt, 'DD-MM-YYYY HH:ss')}</Text>
        </VStack>
        <HStack space={2}>
          <Button variant="ghost" _text={{ color: 'danger.500' }}>
            Từ chối
          </Button>
          <Button bg="tertiary.600" borderRadius={12}>
            Chấp nhận
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};

const RequestList = () => {
  const accommodation = useSelector((state) => state.accommodation);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getRentRequestsAdmin());
  }, [dispatch]);

  return accommodation.loading ? (
    <Loading />
  ) : (
    <ScrollView>
      <VStack px={3.5} pt={4}>
        {accommodation.adminRentRequests.map((rentRequest) => (
          <UserRequestCard
            key={rentRequest.id}
            name={rentRequest.renter.user.name}
            avatar={rentRequest.renter.user.avatar}
            phone={rentRequest.renter.user.phone}
            createdAt={rentRequest.renter.user.createdAt}
            id={rentRequest.renter.user.id}
            navigation={navigation}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default RequestList;
