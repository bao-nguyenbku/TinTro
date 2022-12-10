import React, { useEffect } from 'react';
import { ScrollView, VStack } from 'native-base';
import { RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRentRequestByRenter, selectAccommodationState } from 'store/reducer/accommodation';
import Loading from 'components/loading';
import SingItem from './SingItem';

const RentRequestScreen = () => {
  const dispatch = useDispatch();
  const { rentRequest } = useSelector(selectAccommodationState);
  const { loading, data } = rentRequest;
  useEffect(() => {
    dispatch(getRentRequestByRenter())
  }, [])
  if (loading) {
    return <Loading />
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={loading}
          onRefresh={() => dispatch(getRentRequestByRenter())}
        />
      }
    >
      <VStack
        space='2'
        p='2'
      >
        {data && data.map(item => {
          return (
            <SingItem 
              key={item.id}
              item={item}
            />
          )
        })}
      </VStack>
    </ScrollView>
  )
}

export default RentRequestScreen;
