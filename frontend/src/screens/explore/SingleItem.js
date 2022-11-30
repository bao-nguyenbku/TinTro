import { StyleSheet } from 'react-native';
import { Box, Image, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

const SingleItem = (props) => {
  const { data } = props;
  return (
    <Box flexDirection='row' backgroundColor='white' width='full' padding='10px' borderRadius='xl'>
      <Image
        source={{
          uri: data.thumbnail
        }}
        alt='avatar'
        size='100px'
        borderRadius='xl'
      />
      <Box flex={1} justifyContent='space-between' marginLeft='8px'>
        <Box flexDirection='row' justifyContent='space-between'>
          <Text fontWeight='700' fontSize='md'>{data.name}</Text>
          <Text color='tertiary.600' fontWeight='700'>{data.price}</Text>
        </Box>
        <Box flexDirection='row' justifyContent='space-between'>
          <Box alignItems='center' flexDirection='row' maxWidth='70%'>
            <Ionicons name='location-sharp' size={20} color='#737373' />
            <Text marginLeft='4px'>{[data.addressNumber, data.addressStreet, data.addressDistrict, data.addressCity].join(', ')}</Text>
          </Box>
          <Box alignItems='center' flexDirection='row'>
            <Ionicons name='star-sharp' size={20} color='#FACC15' />
            <Text marginLeft='4px'>{data.reviewStar}</Text>
          </Box>
        </Box>
        <Box flexDirection='row' justifyContent='space-between'>
          <Box alignItems='center' flexDirection='row' color='muted.500'>
            <Ionicons name='scan-sharp' size={20} color='#737373' />
            <Text marginLeft='4px' color='muted.500'>{data.area}m2</Text>
          </Box>
          <Text color='error.400'>Còn 3 phòng trống</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default SingleItem

const styles = StyleSheet.create({})