import React from "react";
import { HStack, Spinner } from "native-base";

const Loading = () => (
  <HStack 
    space={8} 
    justifyContent="center" 
    alignItems="center"
    flex={1}
    zIndex={1}
    left='0'
    right='0'
    top='0'
    bottom='0'
    position='absolute'
    height='full'
    width='full'
  >
      <Spinner size="lg" color="tertiary.600"/>
  </HStack>
);

export default Loading;
