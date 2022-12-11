import React, { useEffect, useState } from 'react';
import { Box, VStack, FormControl, CheckIcon, Select, Button, Text } from 'native-base';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomByOwner, selectAdminAccommodationState, getAllRenterByRoomId } from 'store/reducer/admin-accommodation';
import Loading from 'components/loading';

const CreateCheckoutRequestScreen = () => {
  const dispatch = useDispatch();
  const { rooms, renters } = useSelector(selectAdminAccommodationState);
  const { loading, data } = rooms;
  const [formValues, setFormValues] = useState({
    roomId: -1,
    renterId: -1,
    phoneNumber: 0
  })
  const bottomBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    dispatch(getAllRoomByOwner());
  }, [])
  const handleChooseRenter = (value) => {
    dispatch(getAllRenterByRoomId(value));
  }
  const handleSubmit = () => {
    console.log(formValues);
  }
  if (loading) {
    return <Loading />
  }
  return (
    <Box flex={1}
      paddingBottom={bottomBarHeight}
    >
      <VStack
        alignItems='center'
        space='2'
      >
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Chọn tên phòng</FormControl.Label>
          <Select minWidth="200" accessibilityLabel="choose-room" placeholder="Chọn tên phòng" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />
          }} mt="1"
            onValueChange={(value) => {
              setFormValues(prev => {
                return {
                  ...prev,
                  roomId: value
                }
              })
              handleChooseRenter(value);
            }}
          >
            {data && data.map(item => {
              return (
                <Select.Item
                  key={item.id}
                  label={item.roomName}
                  value={item.id}
                />
              )
            })}
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage> */}
        </FormControl>
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Chọn người thuê</FormControl.Label>
          {renters.loading ? <Loading /> : (
            <Select minWidth="200" accessibilityLabel="choose-renter" placeholder="Tên người thuê phòng" _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />
            }} mt="1"
              onValueChange={(value) => setFormValues(prev => {
                return {
                  ...prev,
                  renterId: value
                }
              })}
            >
              {renters.data && renters.data.map(item => {
                return (
                  <Select.Item
                    key={item.id}
                    label={item.renter.name} value={item.renter.id} />
                )
              })}
            </Select>
          )}
        </FormControl>
        <FormControl w="3/4" maxW="300" isRequired isInvalid>
          <FormControl.Label>Số điện thoại</FormControl.Label>
          <TextInput
            keyboardType='numeric'
            placeholder='Số điện thoại'
            onChangeText={(value) => setFormValues(prev => {
              return {
                ...prev,
                phoneNumber: value
              }
            })}
            style={{
              height: 45,
              paddingLeft: 8,
              borderColor: '#D4D4D4',
              borderWidth: 1,
              borderRadius: 4
              // flex: 1,
            }}
          />
        </FormControl>
      </VStack>
      <Button
        bgColor='tertiary.600'
        width='95%'
        mx='auto'
        marginTop='auto'
        _pressed={{
          opacity: 0.8
        }}
        onPress={handleSubmit}
        height='50px'
      >
        <Text color='white' fontWeight='bold'>Gửi yêu cầu</Text>
      </Button>
    </Box>
  )
}

export default CreateCheckoutRequestScreen;
