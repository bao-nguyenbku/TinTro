import React, { useState } from 'react';
import { Center, Image, Pressable, ScrollView, Text, useToast, VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import sendFileRequest from 'utils/sendFileRequest';
import CustomToast from 'components/custom-toast';
import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';

const mapRoleToText = (role) => {
  switch (role) {
    case 'USER':
      return 'Thuê trọ';
    case 'ADMIN':
      return 'Quản trị';
    default:
      return 'Khách';
  }
};

const AccountMenu = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('file', {
        name: `${new Date()}_avatar`,
        uri: result.assets[0].uri,
        type: 'image/jpg',
      });
      try {
        await sendFileRequest.post('/users/upload-avatar', formData);
        toast.show({
          render: () => <CustomToast title="Cập nhật ảnh đại diện thành công." status="success" />,
        });
      } catch (err) {
        console.log(err);
      }
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView mb={12}>
      <VStack py={4}>
        <Center>
          <Pressable onPress={pickImage}>
            <Image
              size={127}
              borderRadius={127}
              source={{
                uri: !image ? user.currentUser.avatar : image,
              }}
              alt={user.currentUser.name}
            />
          </Pressable>
          <Text pt={2} color="tertiary.600" bold fontSize="2xl">
            {user.currentUser.name}
          </Text>
          <Text color="muted.500">{user.currentUser.role ? mapRoleToText(user.currentUser.role) : 'Khách'}</Text>
        </Center>

        {user.currentUser.role === 'USER' && <UserMenu loading={loading} setLoading={setLoading} dispatch={dispatch} />}
        {user.currentUser.role === 'ADMIN' && <AdminMenu loading={loading} setLoading={setLoading} dispatch={dispatch} />}
      </VStack>
    </ScrollView>
  );
};

export default AccountMenu;
