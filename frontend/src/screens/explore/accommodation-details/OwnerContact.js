import React from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const OwnerContact = (props) => {
  const { item } = props;
  return (
    <Box  bgColor="white" p='3' rounded="full" flexDirection='row' alignItems='center'>
      <Image 
        source={{
          uri: 'https://randomuser.me/api/portraits/women/63.jpg'
        }}
        alt='avatar'
        size={42}
        rounded='full'
      />
      <Box
        flexDirection='row'
        flexGrow={1}
        marginLeft='2'
      >
        <Box>
          <Text fontWeight='700' fontSize='md'>{item?.owner?.user?.name}</Text>
          <Text>{item?.owner?.user?.phone}</Text>
        </Box>
        <Box marginLeft='auto' marginRight={0} flexDirection='row' justifyContent='center' alignItems='center'>
          <Box
            bgColor='coolGray.100'
            p='2'
            rounded='full'
            width='42px'
            height='42px'
            alignItems='center'
            justifyContent='center'
          >
            <TouchableOpacity>
              <Ionicons
                name='chatbubble-ellipses'
                size={20}
                color='#737373'
              />
            </TouchableOpacity>
          </Box>
          <Box
            bgColor='coolGray.100'
            p='2'
            rounded='full'
            width='42px'
            height='42px'
            alignItems='center'
            justifyContent='center'
            marginLeft='2'
          >
            <TouchableOpacity>
              <Ionicons
                name='call'
                size={20}
                color='#737373'
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Box>
    
  )
}

export default OwnerContact;

