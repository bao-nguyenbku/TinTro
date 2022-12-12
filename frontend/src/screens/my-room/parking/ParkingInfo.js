import React from 'react';
import { Box, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const ParkingInfo = (props) => {
  const { data } = props;
  return (
    <Box
      bgColor='white'
      flexDirection='row'
      alignItems='center'
      p='2'
      rounded='xl'
    >
      <Box
        bgColor='teal.400'
        w='12'
        h='12'
        alignItems='center'
        justifyContent='center'
        rounded='2xl'
      >
          <Ionicons name='bicycle-outline' size={24} color='#fff'/>
      </Box>
      <Box
        bgColor='blueGray.100'
        p='2'
        rounded='xl'
        marginLeft='2'
        flex={1}
      >
        <Text fontSize='xl'>Biển kiểm soát: {' '}
          <Text fontWeight='700'>{data.licensePlate}</Text>
        </Text>
        <Text>Loại xe: {data.name}</Text>
      </Box>
    </Box>
  )
}

export default ParkingInfo;
