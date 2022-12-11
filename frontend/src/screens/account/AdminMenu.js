import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Flex, HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { setCurrentUser } from 'store/reducer/user';
import { deleteToken } from 'utils/token';

const AdminMenu = ({ setLoading, loading, dispatch }) => {
  const navigation = useNavigation();
  const menu = [
    {
      id: 1,
      title: 'Quản lý yêu cầu sửa chữa',
      description: 'Xem và quản lý yêu cầu từ người thuê',
      icon: <Ionicons name="person-outline" size={24} color="black" />,
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Yêu cầu trả phòng',
      description: 'Quản lý yêu cầu trả phòng',
      icon: <FontAwesome5 name="check-circle" size={24} color="black" />,
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Hóa đơn',
      description: 'Quản lý hóa đơn',
      icon: <Ionicons name="document-text-outline" size={24} color="black" />,
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Thống kê',
      description: 'Xem thống kê số lượng phòng, hóa đơn...',
      icon: <Ionicons name="ios-albums-outline" size={24} color="black" />,
      onPress: () => navigation.navigate('AdminRoomStatistics'),
    },
  ];

  return (
    <Box pt={2.5} px={6}>
      <VStack borderRadius={12} space={8} px={4} py={6} bgColor="#fff">
        {menu.map((item) => (
          <Pressable key={item.id} onPress={item.onPress}>
            {({ isPressed }) => (
              <Flex backgroundColor={isPressed ? 'muted.100' : '#fff'} alignItems="center" justifyContent="space-between" direction="row">
                <HStack alignItems="center" space={4} direction="row">
                  <Box borderRadius="full" p={1.5} bgColor="blueGray.100">
                    {item.icon}
                  </Box>
                  <VStack space={1}>
                    <Text color="black" fontSize="sm" bold>
                      {item.title}
                    </Text>
                    <Text color="muted.400" fontSize="xs">
                      {item.description}
                    </Text>
                  </VStack>
                </HStack>
                <AntDesign name="right" size={24} color="#ABABAB" />
              </Flex>
            )}
          </Pressable>
        ))}

        <Pressable
          onPress={() => {
            setLoading(true);
            deleteToken().then(() => {
              setLoading(false);
              dispatch(setCurrentUser({}));
            });
          }}
          isloading={loading}
        >
          {({ isPressed }) => (
            <Flex backgroundColor={isPressed ? 'muted.100' : '#fff'} alignItems="center" justifyContent="space-between" direction="row">
              <HStack alignItems="center" space={4} direction="row">
                <Box borderRadius="full" p={1.5} bgColor="danger.100">
                  <MaterialCommunityIcons color="red" name="logout" size={24} />
                </Box>
                <VStack space={1}>
                  <Text color="danger.500" fontSize="sm" bold>
                    Đăng xuất
                  </Text>
                  <Text color="muted.400" fontSize="xs">
                    Thoát khỏi hệ thống
                  </Text>
                </VStack>
              </HStack>
              <AntDesign name="right" size={24} color="#ABABAB" />
            </Flex>
          )}
        </Pressable>
      </VStack>
    </Box>
  );
};
export default AdminMenu;
