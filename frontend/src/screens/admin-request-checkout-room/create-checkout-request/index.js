import React, { useEffect, useState } from 'react';
import { Box, VStack, FormControl, CheckIcon, Select, Button, Text, isEmptyObj, WarningOutlineIcon } from 'native-base';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomByOwner, selectAdminAccommodationState, getAllRenterByRoomId, requestRenterCheckoutByOwner } from 'store/reducer/admin-accommodation';
import Loading from 'components/loading';

const CreateCheckoutRequestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { rooms, renters, requestCheckout } = useSelector(selectAdminAccommodationState);
  const { loading, data } = rooms;
  const bottomBarHeight = useBottomTabBarHeight();
  const [formValues, setFormValues] = useState({
    roomId: undefined,
    renterId: undefined,
    phoneNumber: undefined
  })
  const [errors, setErrors] = useState({
    room: '',
    renter: '',
    phoneNumber: '',
    isPass: false
  })

  const handleChooseRenter = (value) => {
    dispatch(getAllRenterByRoomId(value));
  }

  const validateSubmitForm = (values) => {
    const tmpErrors = {
      room: '',
      renter: '',
      phoneNumber: '',
      isPass: false
    };
    if (!values.roomId) {
      tmpErrors.room = 'You must select a room';
    }
    if (!values.renter) {
      tmpErrors.renter = 'You must select a renter';
    }
    if (!values.phoneNumber) {
      tmpErrors.phoneNumber = 'Your must enter phone number of renter';
    }
    setErrors(tmpErrors);
    return tmpErrors.isPass;
  }

  const handleSubmit = () => {
    validateSubmitForm(formValues);
    //  dispatch(requestRenterCheckoutByOwner(formValues));

  }
  useEffect(() => {
    if (errors.isPass) {
      console.log('yeah ok');
    }
  }, [errors])
  useEffect(() => {
    dispatch(getAllRoomByOwner());
  }, [])
  useEffect(() => {
    if (requestCheckout.isSuccess && !isEmptyObj(requestCheckout.data)) {
      navigation.navigate('AdminRequestCheckoutRoom');
    }
  }, [requestCheckout.isSuccess])
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.room}
          </FormControl.ErrorMessage>
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
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.renter}
          </FormControl.ErrorMessage>
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
              borderRadius: 4,
              // flex: 1,
            }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errors.phoneNumber}
          </FormControl.ErrorMessage>
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
        isLoading={requestCheckout.loading}
        onPress={handleSubmit}
        height='50px'
      >
        <Text color='white' fontWeight='bold'>Gửi yêu cầu</Text>
      </Button>
    </Box>
  );
};

export default CreateCheckoutRequestScreen;
