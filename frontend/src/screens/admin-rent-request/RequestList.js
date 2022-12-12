import { Box, Image, Text } from 'native-base';
import React from 'react';

const RequestList = () => {
  console.log('hello');
  return (
    <Box w="full" h="full">
      <Image
        source={{ uri: 'https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg' }}
        alt="Alternate Text"
        width="129px"
        height="129px"
      />
      <Text>RequestLisadfdsafsdafffffffffffffffffffffffffffffffffffffffffffffffffffst</Text>
    </Box>
  );
};

export default RequestList;
