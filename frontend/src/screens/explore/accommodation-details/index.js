import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView, Divider } from 'native-base';
import Loading from 'components/loading';
import Ionicons from '@expo/vector-icons/Ionicons';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import { Text, View } from 'react-native';

const AccommodationDetailsScreen = (props) => {
  const { navigation, route } = props;
  const { item } = route.params;
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
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
        paddingX='5'
        paddingBottom='2'
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
        <RequestRentalButton />
      </Box>
    </SafeAreaView>
  )
}

export default AccommodationDetailsScreen;
