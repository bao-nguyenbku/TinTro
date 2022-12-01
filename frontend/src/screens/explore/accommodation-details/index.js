import React, { useEffect } from 'react'
import { Box, Text, Image, ScrollView, Divider } from 'native-base';
import Loading from 'components/loading';
import Ionicons from '@expo/vector-icons/Ionicons';

const AccommodationDetailsScreen = (props) => {
  const { navigation, route } = props;
  const { item } = route.params;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    });
    return () => navigation.getParent()?.setOptions({
      tabBarStyle: undefined
    });
  }, [navigation]);
  if (!item) {
    return <Loading />
  }
  return (
    <ScrollView>
      <Box
        bgColor='transparent'
        paddingX='5'
      >
        <Box
          height='222px'
        >
          <Image 
            source={{
              uri: item.thumbnail
            }}
            alt='thumbnail'
            size='full'
            rounded='12'
          />
        </Box>
        <Text>{item.name}</Text>
        <Box
          flexDirection='row'
          width='full'
          bgColor='coolGray.600'
        >
          <Box
            flexDirection='row'
            alignItems='center'
            bgColor='coolGray.400'
            justifyContent='center'
          >
            <Ionicons name='location-sharp' size={20} color='#737373'/>
            <Text>{[item.addressNumber, item.addressStreet, item.addressDistrict, item.addressCity].join(', ')}</Text>
          </Box>
          <Box
            flexDirection='row'
            alignItems='center'
            bgColor='coolGray.400'
            justifyContent='center'
          >
            <Ionicons name='scan-outline' size={20} color='#737373'/>
            <Text>{item.area}m2</Text>
          </Box>
          <Box
            flexDirection='row'
            alignItems='center'
            bgColor='coolGray.400'
            justifyContent='center'
          >
            <Ionicons name='checkbox' size={20} color='#059669'/>
            <Text>Còn 3 phòng trống</Text>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default AccommodationDetailsScreen;
