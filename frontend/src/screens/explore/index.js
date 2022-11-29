import { StyleSheet} from 'react-native'
import React, { useEffect } from 'react';
import { Box, Text } from 'native-base';
import SingleItem from './SingleItem'
import { getAllAccommodations, selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import request from 'utils/axios';
const ExploreScreen = () => {
  const dispatch = useDispatch();
  const { accommodations } = useSelector(selectAccommodationState);
  useEffect(() => {
    dispatch(getAllAccommodations())
  }, [])
  return (
    <Box>
      {accommodations.length > 0 && accommodations.map(item => {
        return (
          <SingleItem 
            key={item.id}
            data={item}
          />
        )
      })}
    </Box>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})