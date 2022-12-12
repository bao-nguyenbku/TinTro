import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmModal from 'components/confirm-modal';
import Loading from 'components/loading';
import { Avatar, Button, Center, Flex, Heading, HStack, Menu, Pressable, ScrollView, Text, useDisclose, useToast, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { assignUserToRoom, deleteRentRequestById, getRentRequestsAdmin } from 'store/reducer/accommodation';
import { formatDate } from 'utils/formatDate';

const UserRequestCard = ({ id, name, phone, createdAt, avatar, navigation, details, dispatch, loading, rentRequestId }) => {
  const [shouldOverlapWithTrigger] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const toast = useToast();
  const [position] = React.useState('auto');
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
          <Button isLoading={loading} onPress={onOpen} variant="ghost" _text={{ color: 'danger.500' }}>
            Từ chối
          </Button>
          <Menu
            shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
            placement={position === 'auto' ? undefined : position}
            trigger={(triggerProps) => (
              <Button isLoading={loading} {...triggerProps} bg="tertiary.600" borderRadius={12}>
                Chấp nhận
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
                            title: 'Chấp nhận thành công',
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
                  title: 'Xóa thành công',
                  status: 'success',
                  duration: 2000,
                  placement: 'top',
                });
              },
            })
          );
        }}
        cancelTitle="Hủy"
        headerTitle="Bạn chắc chắn muốn xóa?"
        content="Sau khi nhấn “Đồng ý”, Yêu cầu sẽ bị xóa vĩnh viễn."
        saveTitle="Đồng ý"
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
  ) : accommodation.adminRentRequests.length ? (
    <ScrollView refreshControl={<RefreshControl refreshing={accommodation.loading} onRefresh={() => dispatch(getRentRequestsAdmin())} />}>
      <VStack px={3.5} pt={4}>
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
    </ScrollView>
  ) : (
    <Flex alignItems="center" h="full">
      Không có yêu cầu thuê phòng
    </Flex>
  );
};

export default RequestList;
