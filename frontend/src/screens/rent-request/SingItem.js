import React from 'react';
import { Badge, Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

const SingItem = (props) => {
  const { item } = props;
  return (
    <Box
      bgColor='white'
      p='3'
      rounded='xl'
    >
      <Box
        flexDirection='row'
        alignItems='center'
      >
        <Image
          source={{
            uri: item?.accommodation?.thumbnail
          }}
          alt='avatar'
          width='20'
          height='20'
          rounded='xl'
        />
        <Text fontWeight='700' fontSize='xl' marginLeft='4'>{item?.accommodation?.name}</Text>
        <Badge colorScheme='emerald'
          position='absolute'
          top={0}
          right={0}
          rounded='xl'
        >
          <Text>Đang duyệt</Text>
        </Badge>
        <TouchableOpacity
          style={{
            marginLeft: 'auto'
          }}
        >
          <Text color='danger.600' fontSize='md'>Hủy</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

export default SingItem;
