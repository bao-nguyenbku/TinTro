import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmModal from 'components/confirm-modal';
import Loading from 'components/loading';
import { Avatar, Button, Center, Flex, Heading, HStack, Menu, Pressable, ScrollView, Text, useDisclose, useToast, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { RefreshControl, Linking } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { assignUserToRoom, deleteRentRequestById, getRentRequestsAdmin } from 'store/reducer/accommodation';
import { formatDate } from 'utils/formatDate';

const UserRequestCard = ({ id, name, phone, createdAt, avatar, navigation, details, dispatch, loading, rentRequestId }) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const [position] = React.useState('auto');
  return (
    <VStack bg="white" space="4" rounded="xl" justifyContent="space-between" px="3" pt="3">
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
                },
                initial: false,
              });
            }}
          >
            {({ isPressed }) => (
              <Center w={42} h={42} borderRadius={12} bg={isPressed ? '#fff' : 'warmGray.100'}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#737373" />
              </Center>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL(`tel://${phone}`);
            }}
          >
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
          <Text color="muted.500">???? y??u c???u l??c:</Text>
          <Text color="muted.500">{formatDate(createdAt, 'DD-MM-YYYY hh:mmA')}</Text>
        </VStack>
        <HStack space={2}>
          <Button isLoading={loading} onPress={onOpen} variant="ghost" _text={{ color: 'danger.500' }}>
            T??? ch???i
          </Button>
          <Menu
            shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
            placement={position === 'auto' ? undefined : position}
            trigger={(triggerProps) => (
              <Button isLoading={loading} {...triggerProps} bg="tertiary.600" borderRadius={12}>
                Ch???p nh???n
              </Button>
            )}
          >
            {details.rooms
              .filter((room) => room.status === 'AVAILABLE')
              .map((room) => (
                <Menu.Item
                  onPress={() => {
                    dispatch(
                      assignUserToRoom({
                        roomId: room.id,
                        userId: id,
                        done: () => {
                          toast.show({
                            title: 'Ch???p nh???n th??nh c??ng',
                            status: 'success',
                            duration: 2000,
                            placement: 'top',
                          });
                        },
                      })
                    );
                  }}
                  key={room.id}
                  textValue={room.roomName}
                >
                  {room.roomName}
                </Menu.Item>
              ))}
          </Menu>
        </HStack>
      </HStack>
      <ConfirmModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onConfirm={() => {
          dispatch(
            deleteRentRequestById({
              id: rentRequestId,
              done: () => {
                toast.show({
                  title: 'X??a th??nh c??ng',
                  status: 'success',
                  duration: 2000,
                  placement: 'top',
                });
              },
            })
          );
        }}
        cancelTitle="H???y"
        headerTitle="B???n ch???c ch???n mu???n x??a?"
        content="Sau khi nh???n ????????ng ?????, Y??u c???u s??? b??? x??a v??nh vi???n."
        saveTitle="?????ng ??"
      />
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

  // eslint-disable-next-line no-nested-ternary
  return accommodation.loading ? (
    <Loading />
  ) : (
    <ScrollView refreshControl={<RefreshControl refreshing={accommodation.loading} onRefresh={() => dispatch(getRentRequestsAdmin())} />}>
      {accommodation.adminRentRequests.length ? (
        <VStack px="4" pt="4">
          {accommodation.adminRentRequests.map((rentRequest) => (
            <UserRequestCard
              key={rentRequest.id}
              rentRequestId={rentRequest.id}
              name={rentRequest.renter.user.name}
              avatar={rentRequest.renter.user.avatar}
              phone={rentRequest.renter.user.phone}
              createdAt={rentRequest.renter.user.createdAt}
              id={rentRequest.renter.user.id}
              navigation={navigation}
              details={accommodation.accommodationDetails}
              dispatch={dispatch}
            />
          ))}
        </VStack>
      ) : (
        <Flex alignItems="center" h="full">
          Kh??ng c?? y??u c???u thu?? ph??ng
        </Flex>
      )}
    </ScrollView>
  );
};

export default RequestList;
