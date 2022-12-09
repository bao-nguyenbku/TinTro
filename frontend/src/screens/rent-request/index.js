import React, { useEffect } from 'react';
import { ScrollView } from 'native-base';
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
    </ScrollView>
  )
}

export default RentRequestScreen;
