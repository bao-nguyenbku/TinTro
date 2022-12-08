import React from 'react';
import { Box, Text } from 'native-base';
import { getHeaderTitle } from '@react-navigation/elements';
import BackButton from 'components/back-button';

const CustomHeader = (props) => {
  const { navigation, route, options, back } = props;
  const { headerRight } = options;
  const title = getHeaderTitle(options, route.name);
  return (
    <Box bg="tertiary.600" height="90px" flexDirection="row" justifyContent="center" alignItems="center" paddingTop="40px" paddingX="5">
      <Box flexDirection="row" alignItems="center" justifyContent="center" width="full" position="relative">
        {back && navigation.canGoBack() && (
          <Box marginLeft={0} marginRight="auto" width="10" height="10" alignItems="center" justifyContent="center">
            <BackButton {...props} />
          </Box>
        )}
        <Text fontSize="lg" color="white" position="absolute">
          {title}
        </Text>
        {headerRight && (
            headerRight()
        )}
      </Box>
    </Box>
  );
};

export default CustomHeader;
