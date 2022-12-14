import React, { useState } from 'react';
import { Box, Text, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const ParkingInfo = (props) => {
  const { data } = props;
  const [inputType, setInputType] = useState({
    type: 'password',
    icon: 'eye-off-outline'
  });
  return (
    <Box
      bgColor='white'
      flexDirection='row'
      alignItems='center'
      p='2'
      rounded='xl'
    >
      <Box
        bgColor='lightBlue.400'
        w='12'
        h='12'
        alignItems='center'
        justifyContent='center'
        rounded='2xl'
      >
        <Ionicons name='wifi-outline' size={24} color='#fff' />
      </Box>
      <Box
        bgColor='blueGray.100'
        p='2'
        rounded='xl'
        marginLeft='2'
        flex={1}
      >
        <Text fontSize='xl' fontWeight='700'>{data.name}</Text>

        <Box
          flexDirection='row'
          alignItems='center'
        >
          <Text>Mật khẩu:</Text>
          <Input 
            value={data.password} 
            flex={1} 
            fontSize='md'
            isReadOnly
            type={inputType.type}
            borderWidth={0}
            rightElement={<Ionicons onPress={() => setInputType(prev => {
              return prev.type === 'text' ? {
                type: 'password',
                icon: 'eye-off-outline'
              } : {
                type: 'text',
                icon: 'eye-outline'
              };
            })} name={inputType.icon} size={24}/>}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ParkingInfo;
