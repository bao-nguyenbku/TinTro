import React from "react";
import { Alert, VStack, HStack, Box, Text, Center, IconButton, CloseIcon } from "native-base";


const CustomToast = (props) => {
  const { status, description, title } = props;
  return <Center>
    <Alert maxW="400" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
          <HStack flexShrink={1} space={2} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
              {title}
            </Text>
          </HStack>
          <IconButton variant="unstyled" _focus={{
            borderWidth: 0
          }} icon={<CloseIcon size="3" />} _icon={{
            color: "coolGray.600"
          }} />
        </HStack>
        <Box pl="6">
          <Text color="coolGray.600">{description}</Text>
        </Box>
      </VStack>
    </Alert>
  </Center>;
}

export default CustomToast;