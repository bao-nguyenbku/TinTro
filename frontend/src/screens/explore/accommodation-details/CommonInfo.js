import React from 'react'
import { Box, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatCurrency } from 'utils/utils';

const CommonInfo = (props) => {
  const { item } = props;
  return (
    <Box
      flexDirection='column'
      width='full'
      justifyContent='flex-start'
      marginTop='2'
    >
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-start'
        marginBottom='2'
      >
        <Ionicons name='location-sharp' size={20} color='#737373' />
        <Text marginLeft='1' color='muted.500'>{[item.addressNumber, item.addressStreet, item.addressDistrict, item.addressCity].join(', ')}</Text>
      </Box>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-start'
        marginBottom='2'
      >
        <Ionicons name='scan-outline' size={20} color='#737373' />
        <Text marginLeft='1' color='muted.500'>{item.area}m2</Text>
      </Box>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-start'
        marginBottom='2'
      >
        <Ionicons name='checkbox' size={20} color='#059669' />
        <Text color='tertiary.600' marginLeft='1'>Còn 3 phòng trống</Text>
      </Box>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='flex-end'
        marginBottom='2'
      >
        <Text color='danger.600' fontSize='xl' fontWeight='700'>{`${formatCurrency(item.price)}/tháng`}</Text>
      </Box>
    </Box>
  )
}

export default CommonInfo;
