import React from 'react'
import { Box, Text, HStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons';

const Utility = (props) => {
  const { item } = props;
  return (
    <Box marginTop='2'>
      <Text fontSize='lg' fontWeight='700'>Tiện ích có sẵn</Text>
      {item.utilities.map(utility => (
        <HStack
          key={`${utility}`}
          alignItems='center'
          space='1'
          marginLeft='3'
        >
          <Ionicons name='checkmark-outline' size={24} color='#059669'/>
          <Text>{utility}</Text>
        </HStack>
      ))}
    </Box>
  )
}

export default Utility

