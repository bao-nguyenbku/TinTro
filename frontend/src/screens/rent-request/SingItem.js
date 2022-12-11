import React from 'react';
import { Badge, Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelRentRequest } from 'store/reducer/accommodation';

const SingItem = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const handleCancelRequest = () => {
    dispatch(cancelRentRequest(item.id));
  }
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
          onPress={handleCancelRequest}
        >
          <Text color='danger.600' fontSize='md'>Hủy</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

export default SingItem;
