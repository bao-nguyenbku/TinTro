import React from 'react';
import { Box, VStack, FormControl, CheckIcon, Select, Button, Text } from 'native-base';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';

const CreateCheckoutRequestScreen = () => {
  const handleSubmit = () => {};
  return (
    <Box flex={1} paddingBottom={useBottomTabBarHeight()}>
      <VStack alignItems="center" space="2">
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Chọn tên phòng</FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="choose-room"
            placeholder="Chọn tên phòng"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="UX Research" value="ux" />
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage> */}
        </FormControl>
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Chọn người thuê</FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="choose-room"
            placeholder="Tên người thuê phòng"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size={5} />,
            }}
            mt="1"
          >
            <Select.Item label="UX Research" value="ux" />
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage> */}
        </FormControl>
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Số điện thoại</FormControl.Label>
          <TextInput
            keyboardType="numeric"
            placeholder="Số điện thoại"
            style={{
              height: 45,
              paddingLeft: 8,
              borderColor: '#D4D4D4',
              borderWidth: 1,
              borderRadius: 4,
              // flex: 1,
            }}
          />
        </FormControl>
      </VStack>
      <Button
        bgColor="tertiary.600"
        width="95%"
        mx="auto"
        marginTop="auto"
        _pressed={{
          opacity: 0.8,
        }}
        onPress={handleSubmit}
        height="50px"
      >
        <Text color="white" fontWeight="bold">
          Gửi yêu cầu
        </Text>
      </Button>
    </Box>
  );
};

export default CreateCheckoutRequestScreen;
