import React, { useEffect } from 'react';
import { ScrollView, Box } from 'native-base';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getAllAccommodations, selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from './SingleItem';

const AccommodationList = (props) => {
  const { navigation, stack } = props;
  const { accommodationDetails } = stack;
  const dispatch = useDispatch();

  const { accommodations, loading } = useSelector(selectAccommodationState);
  useEffect(() => {
    dispatch(getAllAccommodations());
  }, [dispatch]);
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(getAllAccommodations())} />}>
      <Box paddingX="2">
        {accommodations.length > 0 &&
          accommodations.map((item) => (
            <TouchableOpacity onPress={() => navigation.push(accommodationDetails.title)} key={item.id}>
              <SingleItem data={item} />
            </TouchableOpacity>
          ))}
      </Box>
    </ScrollView>
  );
};

export default AccommodationList;
