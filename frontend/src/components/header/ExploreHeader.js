import React from 'react';
import { Box, Input, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import BackButton from 'components/back-button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from 'navigation';

const ExploreHeader = (props) => {
  const { navigation, route, options, back } = props;
  const { headerSearchBarOptions } = options;
  const title = getHeaderTitle(options, route.name);
  return (
    <Box  
      bg="tertiary.600" 
      height='90px'
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      paddingTop='40px'
      paddingX='5'
    >
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
        width='full'
        position='relative'
      >
        {back && navigation.canGoBack() && (
          <Box
            marginLeft={0}
            marginRight='auto'
            width='10'
            height='10'
            alignItems='center'
            justifyContent='center'
          >
          <BackButton {...props} />
        </Box>
        )}
        <Text
          fontSize='lg'
          color='white'
          position='absolute'
        >{title}</Text>
        {headerSearchBarOptions && (
          <Box marginLeft='auto' marginRight={0}>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.explore.stack.searchAccommodation.title)}
            >
              <Ionicons name='search-outline' size={32} color='white'/>
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </Box>
    
  )
}

export default ExploreHeader;
