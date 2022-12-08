import React from 'react';
import { Box } from 'native-base';
import CheckoutMenuItem from './Checkout';

const MyRoomScreen = () => (
  <Box
    alignItems='center'
    justifyContent='center'
    flex={1}
    width='full'
  >
    <CheckoutMenuItem />
  </Box>
);

export default MyRoomScreen;
