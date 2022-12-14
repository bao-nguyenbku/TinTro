import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView } from 'native-base';
import { getRentRequestByRenter, selectAccommodationState } from 'store/reducer/accommodation';
import { getRoomInfo, selectRentingState } from 'store/reducer/renting';
import Loading from 'components/loading';
import { disableBottomTabBar } from 'utils/utils';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import ImageGallery from './ImageGallery';
import Utility from './Utility';

const isCurrentRenting = (roomInfo, item) => {
  return roomInfo.data?.accommodationId === item.id && roomInfo.data?.status === 'RENTING';
}

const AccommodationDetailsScreen = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const item = route.params ? route.params.item : undefined;
  const dispatch = useDispatch();
  const { rentRequest } = useSelector(selectAccommodationState);
  const { roomInfo } = useSelector(selectRentingState);
  const rentRequestLoading = rentRequest.loading;
  console.log(roomInfo);
  useEffect(() => {
    dispatch(getRentRequestByRenter(item?.id));
    dispatch(getRoomInfo());
  }, [item?.id]);
  useEffect(() => {
    disableBottomTabBar(navigation);
    return () =>
      disableBottomTabBar(navigation, {
        action: 'clean',
      });
  }, [navigation]);

  if (!item || rentRequestLoading) {
    return <Loading />;
  }

  const handlePressMessageIcon = () => {
    const owner = item?.owner;

    navigation.getParent().navigate('Message', {
      screen: 'SendMessage',
      params: {
        fromId: owner?.id,
        avatar: owner?.avatar,
        name: owner?.name,
        initial: false,
      },
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <ScrollView>
        <Box flex={1} p='4'>
          <Box bgColor="transparent">
            <Box height="222px">
              <Image
                source={{
                  uri: item?.thumbnail,
                }}
                alt="thumbnail"
                size="full"
                rounded="12"
              />
              <Box alignItems="center" flexDirection="row" position="absolute" top={1} right={1} bgColor="black:alpha.40" rounded="xl" p="1">
                <Ionicons name="star-sharp" size={20} color="#FACC15" />
                <Text marginLeft="4px" color="white">
                  {item?.reviewStar}
                </Text>
              </Box>
            </Box>
            <Text fontSize="2xl" fontWeight="700" marginTop="2">
              {item?.name}
            </Text>
            <CommonInfo item={item} />
            <OwnerContact item={item} handlePressMessageIcon={handlePressMessageIcon} />
            <Description item={item} />
            <Utility item={item} />
            <ImageGallery images={item?.images} />
          </Box>
        </Box>
      </ScrollView>
      <Box px='4'>
        {!isCurrentRenting(roomInfo, item) && (
          <RequestRentalButton item={item} />
        )}
        
      </Box>
    </SafeAreaView>
  );
};

export default AccommodationDetailsScreen;
