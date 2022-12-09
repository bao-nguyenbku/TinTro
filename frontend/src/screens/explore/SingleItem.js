import { Box, Image, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { formatCurrency } from 'utils/utils';

const SingleItem = (props) => {
  const { data } = props;
  return (
    <Box flexDirection="row" backgroundColor="white" width="full" padding="10px" borderRadius="xl" marginTop="2" alignItems='center'>
      <Box height="32">
        <Image
          source={{
            uri: data.thumbnail,
          }}
          alt="avatar"
          style={{
            height: '100%',
            aspectRatio: 1,
          }}
          borderRadius="xl"
        />
      </Box>
      <Box flex={1} justifyContent="space-between" marginLeft="8px" height='auto'>
        <Box flexDirection="row" justifyContent="space-between">
          <Text fontWeight="700" fontSize="md">
            {data.name}
          </Text>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Box alignItems="center" flexDirection="row" flex={1}>
            <Ionicons name="location-sharp" size={20} color="#737373" />
            <Text marginLeft="4px" flex={1} flexWrap='wrap'>{[data.addressNumber, data.addressStreet, data.addressDistrict, data.addressCity].join(', ')}</Text>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Box alignItems="center" flexDirection="row" color="muted.500">
            <Ionicons name="scan-sharp" size={20} color="#737373" />
            <Text marginLeft="4px" color="muted.500">
              {data.area}m2
            </Text>
          </Box>
          <Box alignItems="center" flexDirection="row">
            <Ionicons name="star-sharp" size={20} color="#FACC15" />
            <Text marginLeft="4px">{data.reviewStar}</Text>
          </Box>
        </Box>
        <Text color="error.400">Còn {data.availableRooms} phòng trống</Text>
        <Box flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
          <Text color="tertiary.600" fontWeight="700" fontSize="lg">
            {formatCurrency(data.price)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleItem;
