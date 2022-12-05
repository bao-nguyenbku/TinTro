import React, { useEffect, useLayoutEffect } from "react";
import { ScrollView, Box } from "native-base";
import { RefreshControl, TouchableOpacity } from 'react-native';
import { getAllAccommodations, selectAccommodationState } from "store/reducer/accommodation";
import { useDispatch, useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import Loading from "components/loading";

const AccommodationList = (props) => {
  const { navigation, stack } = props;
  const { accommodationDetails } = stack;
  const dispatch = useDispatch();
  async function fetchAllAccommodationData() {
    dispatch(getAllAccommodations());
  }
  const { accommodations, loading } = useSelector(selectAccommodationState);
  useEffect(() => {
    fetchAllAccommodationData();
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        enable: true
      }
    })
  }, [navigation])
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => fetchAllAccommodationData()}
        />
      }
    >
      <Box
        paddingX='2'
      >
        {accommodations.length > 0 && accommodations.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(accommodationDetails.title, {
                item
              })}
              key={item.id}
            >
              <SingleItem
                data={item}
              />
            </TouchableOpacity>
          )
        })}
      </Box>
    </ScrollView>
  )
}

export default AccommodationList;