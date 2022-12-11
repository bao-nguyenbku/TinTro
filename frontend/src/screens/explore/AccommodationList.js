import React, { useEffect, useLayoutEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ScrollView, Box, Text } from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getAllAccommodations, selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from './SingleItem';
import SearchIcon from './SearchIcon';
import RecommendAccommodation from './RecommendAccommodation';


const AccommodationList = (props) => {
  const { navigation, stack } = props;
  const { accommodationDetails } = stack;
  const dispatch = useDispatch();
  const bottomBarHeight = useBottomTabBarHeight();
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
      </ScrollView>
  );
};

export default AccommodationList;
