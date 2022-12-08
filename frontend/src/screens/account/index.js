import React, { useState } from 'react';
import { Center, Image, Pressable, Text, useToast, VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from 'utils/token';
import { setCurrentUser } from 'store/reducer/user';
import * as ImagePicker from 'expo-image-picker';
import sendFileRequest from 'utils/sendFileRequest';
import CustomToast from 'components/custom-toast';

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
    <VStack py={4}>
      <Center>
        <Pressable onPress={pickImage}>
          <Image
            size={127}
            borderRadius={127}
            source={{
              uri: !image ? user.currentUser.avatar : image,
            }}
            alt="user avatar"
          />
        </Pressable>
      </Center>

      <VStack>
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
          <Text>Đăng xuất</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default AccountMenu;
