import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Box, Text, Input, VStack, ScrollView, useToast } from 'native-base';
import { formatDate } from 'utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { registerParking, selectParkingState, reset } from 'store/reducer/parking';
import { formatCurrency, disableBottomTabBar } from 'utils/utils';
import { useTopHeight } from 'hooks/useHeaderHeight';
import { useNavigation } from '@react-navigation/native';
import RegisterButton from './RegisterButton';

const RegisterWifi = () => {
  const startDate = new Date();
  const endDate = (new Date()).setDate(startDate.getDate() + 31);
  const { parking } = useSelector(selectParkingState);
  const toast = useToast();
  const topHeight = useTopHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    startDate,
    licensePlate: '',
    name: '',
    color: ''
  })
  const hanldeSubmit = () => {
    dispatch(registerParking(formValues));
  }
  useEffect(() => {
    if (parking.isSuccess) {
      navigation.goBack();
      toast.show({
        description: 'Đăng ký giữ xe thành công'
      })
    }
    return () =>
      dispatch(reset())
  }, [parking.isSuccess])
  
  useLayoutEffect(() => {
    disableBottomTabBar(navigation);
    return () => 
      disableBottomTabBar(navigation, {
        action: 'clean'
      })
  }, [navigation])
  return (
    <KeyboardAvoidingView
     style={{
      flex: 1
     }}
     keyboardVerticalOffset={topHeight}
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        flex={1}
      >
        <VStack
          bgColor='white'
          p='4'
          space='4'
        >
          <Box>
            <Text>Ngày bắt đầu</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
              p='4'
            >
              <Text fontSize='md' fontWeight='700'>{(formatDate(startDate, 'DD - MM - YYYY hh:mmA'))}</Text>
            </Box>
          </Box>
          <Box>
            <Text>Ngày hết hạn</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
              p='4'
            >
              <Text fontSize='md' fontWeight='700'>{(formatDate(endDate, 'DD - MM - YYYY hh:mmA'))}</Text>
            </Box>
          </Box>
          <Box>
            <Text>Giá</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
              p='4'
            >
              <Text fontSize='md' fontWeight='700'>{`${formatCurrency(50000)}/tháng`}</Text>
            </Box>
          </Box>
          <Box>
            <Text>Biển kiểm soát</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
            >
              <Input fontSize='md' fontWeight='700' p='4' rounded='xl' placeholder='Ví dụ: 59P1-34567'
                value={formValues.licensePlate}
                onChangeText={(value) => setFormValues(prev => {
                  return {
                    ...prev,
                    licensePlate: value
                  }
                })}
              />
            </Box>
          </Box>
          <Box>
            <Text>Loại xe</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
            >
              <Input fontSize='md' fontWeight='700' p='4' rounded='xl' placeholder='Ví dụ: Yamaha Exciter 150cc'
                value={formValues.name}
                onChangeText={(value) => setFormValues(prev => {
                  return {
                    ...prev,
                    name: value
                  }
                })}
              />
            </Box>
          </Box>
          <Box>
            <Text>Màu xe</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
            >
              <Input fontSize='md' fontWeight='700' p='4' rounded='xl' placeholder='Ví dụ: Xanh nhám đen'
                value={formValues.color}
                onChangeText={(value) => setFormValues(prev => {
                  return {
                    ...prev,
                    color: value
                  }
                })}
              />
            </Box>
          </Box>
          <RegisterButton 
            onPress={hanldeSubmit}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterWifi;

