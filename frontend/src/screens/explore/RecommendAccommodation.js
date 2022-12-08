import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, ScrollView } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { getRecommendAccommodations, selectAccommodationState } from 'store/reducer/accommodation';
import { useSelector, useDispatch } from 'react-redux';
import Loading from 'components/loading';
import RecommendSingleItem from './RecommendSingleItem';

const RecommendAccommodation = (props) => {
  const { navigation, stack } = props;
  const { accommodationDetails } = stack;
  const dispatch = useDispatch();
  const { recommendAccommodations, loading } = useSelector(selectAccommodationState);
  useEffect(() => {
    dispatch(getRecommendAccommodations())
  }, [])
  if (loading)
    return <Loading />
  return (
    <LinearGradient
      colors={['#059669', 'transparent']}
      locations={[0.6, 0.6]}
    >
      <ScrollView
        horizontal
        indicatorStyle='default'
        showsHorizontalScrollIndicator={false}
      >
        <Box flexDirection='row' padding='4'>
          {recommendAccommodations && recommendAccommodations.map(data => {
            return (
              <TouchableOpacity
                key={data.id}
                onPress={() => navigation.navigate(accommodationDetails.title, { item: data })}
              >
                <RecommendSingleItem
                  data={data}
                />
              </TouchableOpacity>
            )
          })}
        </Box>
      </ScrollView>
    </LinearGradient>
  )
}

export default RecommendAccommodation;
