import React, { useState } from 'react';
import { Avatar, Box, Pressable, VStack } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { deleteToken } from 'utils/token';
import { setCurrentUser } from 'store/reducer/user';

const AccountScreen = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <VStack>
      <Box>
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
          Đăng xuất
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default AccountScreen;
