import React from 'react';
import { VStack, Box, Image, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrency } from 'utils/utils';

const RecommendSingleItem = (props) => {
  const { data } = props;
  return (
    <Box bgColor="white" rounded="xl" width="240px" marginRight="8">
      <Box>
        <Image
          source={{
            uri: data?.thumbnail,
          }}
          alt="thumbnail"
          width="full"
          height="160px"
          roundedTop="xl"
        />
        <Box alignItems="center" flexDirection="row" position="absolute" top={1} right={1} bgColor="black:alpha.40" rounded="xl" p="1">
          <Ionicons name="star-sharp" size={20} color="#FACC15" />
          <Text marginLeft="4px" color="white">
            {data.reviewStar}
          </Text>
        </Box>
      </Box>
      <VStack padding="2" space="1">
        <Text fontWeight="700" fontSize="xl">
          {data?.name}
        </Text>
        <Box alignItems="center" flexDirection="row" flex={1}>
          <Ionicons name="location-sharp" size={20} color="#737373" />
          <Text marginLeft="4px" flex={1} flexWrap="wrap" color="muted.500">
            {[data.addressNumber, data.addressStreet, data.addressDistrict, data.addressCity].join(', ')}
          </Text>
        </Box>
        <Box alignItems="center" flexDirection="row" color="muted.500">
          <Ionicons name="scan-sharp" size={20} color="#737373" />
          <Text marginLeft="4px" color="muted.500">
            {data.area}m2
          </Text>
        </Box>
        <Text color="error.400">Còn 3 phòng trống</Text>
        <Box flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
          <Text color="tertiary.600" fontWeight="700" fontSize="lg">
            {formatCurrency(data.price)}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default RecommendSingleItem;
