import React from 'react';
import { Box } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchIcon = (props) => {
  const { navigation, stack } = props;
  const { searchAccommodation } = stack;
  
  return (
    <Box marginLeft="auto" marginRight={0}>
      <TouchableOpacity
        onPress={() => navigation.navigate(searchAccommodation.title)}
      >
        <Ionicons name="search-outline" size={32} color="white" />
      </TouchableOpacity>
    </Box>
  )
}

export default SearchIcon;
