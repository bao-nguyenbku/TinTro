import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView, Divider } from 'native-base';
import Loading from 'components/loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import { disableBottomTabBar } from 'utils/utils';

const AccommodationDetailsScreen = (props) => {
  const { navigation, route } = props;
  const { item } = route.params;
  useEffect(() => {
    disableBottomTabBar(props);
    return () => disableBottomTabBar(props, {
      action: 'clean'
    })
  }, [navigation]);
  if (!item) {
    return <Loading />
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Box
        flex={1}
        padding='5'
      >
        <ScrollView>
          <Box
            bgColor='transparent'
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
            <Text
              fontSize='2xl'
              fontWeight='700'
              marginTop='2'
            >{item.name}</Text>
            <CommonInfo item={item} />
            <OwnerContact item={item} />
            <Description item={item} />
          </Box>
        </ScrollView>
        <RequestRentalButton item={item} />
      </Box>
    </SafeAreaView>
  )
}

export default AccommodationDetailsScreen;
