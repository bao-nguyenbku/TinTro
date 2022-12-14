import React from 'react'
import { Box, Text, Badge } from 'native-base';

const SingleItem = (props) => {
  const { item } = props;
  return (
    <Box
      flexDirection='row'
      height='100px'
      p='3'
      rounded='xl'
    >
      <Box>
        <Text fontWeight='700' fontSize='2xl'>Phòng {item.room.roomName}</Text>
        <Text color='muted.500'>Người thuê: <Text fontWeight='700'>{item.renter.name}</Text></Text>
        <Text>Người yêu cầu: {' '}
          <Text fontWeight='700'>
            {item.requestRole === 'USER' ? item.renter.name : 'Chủ trọ'}
          </Text>
        </Text>
      </Box>
      <Badge bgColor='error.500' rounded='2xl' height='34px' marginLeft='auto'>
        <Text color='white'>Đợi xác nhận</Text>
      </Badge>
    </Box>
  )
}

export default SingleItem;
