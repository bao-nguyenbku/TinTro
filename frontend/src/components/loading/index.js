import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from 'native-base';

const Loading = () => (
  <Box flex={1} justifyContent="center" flexDirection="row" padding="10px">
    <ActivityIndicator size="large" color="#059669" />
  </Box>
);

export default Loading;
