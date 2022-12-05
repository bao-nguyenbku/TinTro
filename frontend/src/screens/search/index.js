import React, { useEffect, useState } from 'react'
import { Box, Text, Input, ScrollView } from 'native-base';
import { TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { disableBottomTabBar } from 'utils/utils';
import { selectAccommodationState , searchAccommodationByKeyword } from 'store/reducer/accommodation';
import { useDispatch, useSelector } from 'react-redux';
import SingleItem from 'screens/explore/SingleItem';
import Ionicons from '@expo/vector-icons/Ionicons';
import Loading from 'components/loading';

const SearchScreen = (props) => {
  const { navigation } = props;
  const { searchAccommodations, loading } = useSelector(selectAccommodationState);
  const [focusStyle, setFocusStyle] = useState({
    borderColor: 'muted.300'
  });
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    disableBottomTabBar(props);
    return () => disableBottomTabBar(props, {
      action: 'clean'
    });
  }, [navigation])

  const submitSearchText = ({ nativeEvent }) => {
    dispatch(searchAccommodationByKeyword(nativeEvent.text))
      .then(() => setSearchText(nativeEvent.text));
  }
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <>
        <Box padding='2'>
          <Box
            w='100%'
            {...focusStyle}
            borderWidth={1}
            rounded='md'
            flexDirection='row'
            alignItems='center'
            paddingX='1'
          >
            <Ionicons name='search-outline' size={24} color='#737373' />
            <TextInput
              placeholder='Tìm kiếm'
              returnKeyType='search'
              onSubmitEditing={submitSearchText}
              autoFocus
              clearButtonMode='while-editing'
              onFocus={() => setFocusStyle({
                bgColor: '0891B2:alpha.10',
                borderColor: 'primary.600'
              })}
              onBlur={() => setFocusStyle({
                borderColor: 'muted.300'
              })}
              style={{
                height: 40,
                paddingLeft: 8,
                flex: 1
              }}
            />
          </Box>
        </Box>
        <ScrollView>
          {loading ? <Loading /> : (
            <Box
              alignItems='center'
              paddingX='2'
            >
              {searchAccommodations && searchAccommodations.length > 0
                ? <Text fontWeight='600'>Kết quả tìm kiếm cho "{searchText}"</Text>
                : <Text fontWeight='600'>Không tìm thấy kết quả cho "{searchText}"</Text>
              }
              {searchAccommodations && searchAccommodations.map(item => {
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
        </ScrollView>
      </>

    </TouchableWithoutFeedback>
  )
}

export default SearchScreen;