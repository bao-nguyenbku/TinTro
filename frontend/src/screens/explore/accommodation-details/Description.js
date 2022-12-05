import React from 'react'
import { Box, Text } from 'native-base';

const Description = (props) => {
  const { item } = props;
  return (
    <Box marginTop='2'>
      <Text fontSize='lg' fontWeight='700'>Mô tả</Text>
      <Text>{item?.description}</Text>
    </Box>
  )
}

export default Description;
