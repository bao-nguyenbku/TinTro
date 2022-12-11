import React, { useEffect } from 'react';
<<<<<<< HEAD
// import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView } from 'native-base';
import Loading from 'components/loading';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getRentRequestByRenter } from 'store/reducer/accommodation';
=======
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Box, Text, Image, ScrollView } from 'native-base';
import { getRentRequestByRenter, selectAccommodationState } from 'store/reducer/accommodation';
import Loading from 'components/loading';
>>>>>>> remotes/origin/ntb/checkout-when-renting
import { disableBottomTabBar } from 'utils/utils';
import { useNavigation } from '@react-navigation/native';
import CommonInfo from './CommonInfo';
import OwnerContact from './OwnerContact';
import Description from './Description';
import RequestRentalButton from './RequestRentalButton';
import ImageGallery from './ImageGallery';
<<<<<<< HEAD
=======
import Utility from './Utility';
>>>>>>> remotes/origin/ntb/checkout-when-renting

const AccommodationDetailsScreen = (props) => {
  const navigation = useNavigation();
  const { route } = props;
  const item =  route.params ? route.params.item : undefined;
<<<<<<< HEAD

  const dispatch = useDispatch();
=======
  const dispatch = useDispatch();
  const { rentRequest } = useSelector(selectAccommodationState);
  const rentRequestLoading = rentRequest.loading;
  useEffect(() => {
    dispatch(getRentRequestByRenter(item?.id));
  }, [item?.id]);
>>>>>>> remotes/origin/ntb/checkout-when-renting
  useEffect(() => {
    disableBottomTabBar(navigation);
    return () =>
      disableBottomTabBar(navigation, {
        action: 'clean',
      });
  }, [navigation]);

<<<<<<< HEAD
  useEffect(() => {
    dispatch(getRentRequestByRenter(item?.id));
  }, [item?.id]);

  if (!item) {
=======
  if (!item || rentRequestLoading) {
>>>>>>> remotes/origin/ntb/checkout-when-renting
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
        flex: 1,
      }}
    >
      <Box flex={1} padding="5">
        <ScrollView>
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
            </Box>
            <Text fontSize="2xl" fontWeight="700" marginTop="2">
              {item?.name}
            </Text>
            <CommonInfo item={item} />
            <OwnerContact item={item} handlePressMessageIcon={handlePressMessageIcon} />
            <Description item={item} />
<<<<<<< HEAD
=======
            <Utility item={item}/>
>>>>>>> remotes/origin/ntb/checkout-when-renting
            <ImageGallery images={item?.images} />
          </Box>
        </ScrollView>
        <RequestRentalButton item={item} />
      </Box>
    </SafeAreaView>
  );
};

export default AccommodationDetailsScreen;
