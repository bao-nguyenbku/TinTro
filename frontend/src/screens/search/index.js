import React, { useEffect,useState } from 'react'
import { Box, Text, Input, ScrollView } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { disableBottomTabBar } from 'utils/utils';
import { selectAccommodationState } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from 'screens/explore/SingleItem';

const SearchScreen = (props) => {
  const { navigation } = props;
  const { accommodations } = useSelector(selectAccommodationState);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    disableBottomTabBar(props);
    return () => disableBottomTabBar(props, {
      action: 'clean'
    });
  }, [navigation])

  const submitSearchText = () => {
    console.log('Submit: ', searchText);
  }
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <>
        <Box w='100%' padding='5'>
          <Input 
            placeholder="Input" 
            w="100%" 
            variant='rounded' 
            size='2xl' 
            value={searchText}
            autoFocus 
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={submitSearchText}
          />
        </Box>
        <ScrollView>
          {accommodations && accommodations.map(item => {
            return (
              <SingleItem 
                key={item.id}
                data={item}
              />
            )
          })}
        </ScrollView>
      </>

    </TouchableWithoutFeedback>
  )
}

export default SearchScreen;
