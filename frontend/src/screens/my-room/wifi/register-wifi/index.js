import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Box, Text, Input, VStack, ScrollView, useToast } from 'native-base';
import { formatDate } from 'utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { registerWifi, selectWifiState, reset } from 'store/reducer/wifi';
import { disableBottomTabBar } from 'utils/utils';
import { useTopHeight } from 'hooks/useHeaderHeight';
import { useNavigation } from '@react-navigation/native';
import RegisterButton from './RegisterButton';
import ChoosePackage from './ChoosePackage';

const RegisterWifi = () => {
  const startDate = new Date();
  const endDate = (new Date()).setDate(startDate.getDate() + 31);
  const { wifi } = useSelector(selectWifiState);
  const toast = useToast();
  const topHeight = useTopHeight();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    startDate,
    password: '',
    confirmPassword: '',
    speed: '',
    price: 0
  })
  const hanldeSubmit = () => {
    const registerData = { ...formValues };
    delete registerData.confirmPassword;
    dispatch(registerWifi(registerData));
  }
  useEffect(() => {
    if (wifi.isSuccess) {
      navigation.goBack();
      toast.show({
        description: 'Đăng ký Wifi thành công'
      })
    }
    return () =>
      dispatch(reset())
  }, [wifi.isSuccess])

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
          <ChoosePackage 
            onChangeValue={(value) => setFormValues(prev => {
              return {
                ...prev,
                ...value
              }
            })}
          />
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
            <Text>Mật khẩu</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
            >
              <Input 
                fontSize='md' 
                fontWeight='700' 
                p='4' 
                rounded='xl' 
                type='password'
                value={formValues.licensePlate}
                onChangeText={(value) => setFormValues(prev => {
                  return {
                    ...prev,
                    password: value
                  }
                })}
              />
            </Box>
          </Box>
          <Box>
            <Text>Nhập lại mật khẩu</Text>
            <Box
              bgColor='blueGray.100'
              rounded='xl'
            >
              <Input 
                fontSize='md' 
                fontWeight='700' 
                p='4' 
                rounded='xl' 
                type='password'
                isInvalid={formValues.confirmPassword !== formValues.password}
                _invalid={{
                  borderColor: 'danger.600',
                  bgColor: 'danger.50',
                }}
                value={formValues.name}
                onChangeText={(value) => setFormValues(prev => {
                  return {
                    ...prev,
                    confirmPassword: value
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

