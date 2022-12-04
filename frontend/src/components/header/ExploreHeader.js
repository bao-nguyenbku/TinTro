import React from 'react';
import { Box, Text } from 'native-base';
import { getHeaderTitle } from '@react-navigation/elements';
import BackButton from 'components/back-button';

const ExploreHeader = (props) => {
  const { navigation, route, options, back } = props;
  const title = getHeaderTitle(options, route.name);
  return (
    <Box bg="transparent" height="90px" flexDirection="row" justifyContent="center" alignItems="center" paddingTop="40px" paddingX="5">
      <Box flexDirection="row" alignItems="center" justifyContent="center" width="full" position="relative">
        {back && navigation.canGoBack() && (
          <Box marginLeft={0} marginRight="auto" bgColor="white" width="10" height="10" alignItems="center" justifyContent="center" borderRadius="lg">
            <BackButton {...props} />
          </Box>
        )}
        <Text fontSize="lg" color="muted.500" position="absolute">
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default ExploreHeader;
