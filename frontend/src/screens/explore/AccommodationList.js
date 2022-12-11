import React, { useEffect, useLayoutEffect } from 'react';
<<<<<<< HEAD
import { ScrollView, Box } from 'native-base';
=======
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ScrollView, Box, Text } from 'native-base';
>>>>>>> remotes/origin/ntb/checkout-when-renting
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getAllAccommodations, selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from './SingleItem';
import SearchIcon from './SearchIcon';
<<<<<<< HEAD
=======
import RecommendAccommodation from './RecommendAccommodation';

>>>>>>> remotes/origin/ntb/checkout-when-renting

const AccommodationList = (props) => {
  const { navigation, stack } = props;
  const { accommodationDetails } = stack;
  const dispatch = useDispatch();
<<<<<<< HEAD

=======
  const bottomBarHeight = useBottomTabBarHeight();
>>>>>>> remotes/origin/ntb/checkout-when-renting
  async function fetchAllAccommodationData() {
    dispatch(getAllAccommodations());
  }

  const { accommodations, loading } = useSelector(selectAccommodationState);
  useEffect(() => {
    dispatch(getAllAccommodations());
  }, [dispatch]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SearchIcon {...props} />
    });
  }, [navigation]);
  return (
<<<<<<< HEAD
      <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchAllAccommodationData()} />}>
        <Box paddingX="2">
          {accommodations.length > 0 &&
            accommodations.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(accommodationDetails.title, {
                      item,
                    })
                  }
                  key={item.id}
                >
                  <SingleItem data={item} />
                </TouchableOpacity>
              );
            })}
        </Box>
=======
      <ScrollView 
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => fetchAllAccommodationData()} />}
        contentContainerStyle={{paddingBottom: bottomBarHeight}}
      >
          <RecommendAccommodation navigation={navigation} {...props}/>
          <Box paddingX="2" marginTop='8'>
            <Text fontSize='xl' fontWeight='700'>Tiềm năng</Text>
            {accommodations.length > 0 &&
              accommodations.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(accommodationDetails.title, {
                        item,
                      })
                    }
                    key={item.id}
                  >
                    <SingleItem data={item} />
                  </TouchableOpacity>
                );
              })}
          </Box>
>>>>>>> remotes/origin/ntb/checkout-when-renting
      </ScrollView>
  );
};

export default AccommodationList;
