import React, { useState } from 'react';
import { Avatar, Box, Pressable, Text, VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from 'utils/token';
import { setCurrentUser } from 'store/reducer/user';

const AccountMenu = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <VStack>
      <Box alignItems="center" py={12}>
        <Avatar source={{ uri: user.currentUser.avatar }} />
      </Box>

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
          <Text>Đăng xuất abc</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default AccountMenu;
