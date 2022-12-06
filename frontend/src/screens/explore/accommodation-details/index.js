import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView } from 'native-base';
import Loading from 'components/loading';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getRentRequestByRenter } from 'store/reducer/accommodation';
import { disableBottomTabBar } from 'utils/utils';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import ImageGallery from './ImageGallery';

const AccommodationDetailsScreen = (props) => {
  const { route, navigation } = props;
  const { item } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    disableBottomTabBar(navigation);
    return () =>
      disableBottomTabBar(navigation, {
        action: 'clean',
      });
  }, [navigation]);

  useEffect(() => {
    dispatch(getRentRequestByRenter(item.id));
  }, [item.id, dispatch]);

  if (!item) {
    return <Loading />;
  }

  const handlePressMessageIcon = () => {
    const owner = item?.owner;
    console.log(owner);
    navigation.getParent().navigate('Message', {
      screen: 'SendMessage',
      params: {
        fromId: owner?.id,
        avatar: owner?.avatar,
        name: owner?.name,
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Box flex={1} padding="5">
        <ScrollView>
          <Box bgColor="transparent">
            <Box height="222px">
              <Image
                source={{
                  uri: item.thumbnail,
                }}
                alt="thumbnail"
                size="full"
                rounded="12"
              />
            </Box>
            <Text fontSize="2xl" fontWeight="700" marginTop="2">
              {item.name}
            </Text>
            <CommonInfo item={item} />
            <OwnerContact item={item} handlePressMessageIcon={handlePressMessageIcon} />
            <Description item={item} />
            <ImageGallery images={item.images} />
          </Box>
        </ScrollView>
        <RequestRentalButton item={item} />
      </Box>
    </SafeAreaView>
  );
};

export default AccommodationDetailsScreen;
