import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Box, Button, Center, Flex, Divider, Heading, Input, Pressable, Text, VStack, FormControl, KeyboardAvoidingView } from 'native-base';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { useTopHeight } from 'hooks/useHeaderHeight';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { register, resetData } from 'store/reducer/user';
import * as yup from 'yup';
import { Formik } from 'formik';

import ErrorMessage from 'components/ErrorFormMessage';

const registerSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  name: yup.string().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Mật khẩu không được để trống'),
  reEnterPassword: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Mật khẩu không được để trống'),
});

function RegisterScreen() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [showReEnter, setShowReEnter] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const topHeight = useTopHeight();
  const handleSubmitRegister = (values) => {
    // TODO: done callback function: add something to notify user that they have logged in successfully
    dispatch(register({ ...values, done: () => navigation.navigate('Login') }));
  };

  useFocusEffect(() => {
    dispatch(resetData());
  });

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' && 'padding'} keyboardVerticalOffset={Platform.OS === 'ios' && topHeight}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack w="100%" space={3} alignItems="center">
          {/* Header */}
          <Center mt={12} w="100%" h="1/6">
            <Heading size="xl"> Tạo ngay tài khoản </Heading>
            <Heading size="xl">
              {' '}
              để khám phá <Text color="tertiary.600">TinTro</Text>{' '}
            </Heading>
            {user.error && <Text color="danger.600">{user.error}</Text>}
          </Center>

          {/* Form */}
          <Center h="auto" px="3.5" w="100%" alignItems="center" justifyContent="center">
            <Formik
              validationSchema={registerSchema}
              initialValues={{
                name: '',
                email: '',
                phone: '',
                password: '',
                reEnterPassword: '',
              }}
              onSubmit={(values) => handleSubmitRegister(values)}
              mb="3.5"
            >
              {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                <FormControl>
                  <Box mb="3.5">
                    {errors.name && touched.name && <ErrorMessage name="name" errors={errors} />}
                    <Input
                      type="text"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      _hover={{ backgroundColor: '#fff' }}
                      InputLeftElement={
                        <Box pl="3.5">
                          <Ionicons name="people-outline" size={24} color="grey" />
                        </Box>
                      }
                      size="2xl"
                      isRequired
                      borderRadius="xl"
                      w="100%"
                      placeholder="Username"
                    />
                  </Box>
                  <Box mb="3.5">
                    {errors.email && touched.email && <ErrorMessage name="email" errors={errors} />}
                    <Input
                      type="email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      InputLeftElement={
                        <Box pl="3.5">
                          <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
                        </Box>
                      }
                      size="2xl"
                      borderRadius="xl"
                      w="100%"
                      placeholder="Email"
                      keyboardType="email-address"
                    />
                  </Box>
                  <Box mb="3.5">
                    {errors.phone && touched.phone && <ErrorMessage name="phone" errors={errors} />}
                    <Input
                      InputLeftElement={
                        <Box pl="3.5">
                          <MaterialCommunityIcons name="phone-outline" size={24} color="grey" />
                        </Box>
                      }
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      size="2xl"
                      borderRadius="xl"
                      w="100%"
                      placeholder="Số điện thoại"
                    />
                  </Box>
                  <Box mb="3.5">
                    {errors.password && touched.password && <ErrorMessage name="password" errors={errors} />}
                    <Input
                      _hover={{ backgroundColor: '#fff' }}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      px="3"
                      InputLeftElement={
                        <Box pl="3.5">
                          <Ionicons name="lock-closed-outline" size={24} color="grey" />
                        </Box>
                      }
                      type={show ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Box mx="3.5">
                            <MaterialIcons color="grey" size={24} name={show ? 'visibility' : 'visibility-off'} />
                          </Box>
                        </Pressable>
                      }
                      size="2xl"
                      borderRadius="xl"
                      w="100%"
                      placeholder="Password"
                    />
                  </Box>
                  {errors.reEnterPassword && touched.reEnterPassword && <ErrorMessage name="reEnterPassword" errors={errors} />}
                  <Box mb="3.5">
                    <Input
                      px="3"
                      isRequired
                      onChangeText={handleChange('reEnterPassword')}
                      onBlur={handleBlur('reEnterPassword')}
                      value={values.reEnterPassword}
                      InputLeftElement={
                        <Box pl="3.5">
                          <Ionicons name="lock-closed-outline" size={24} color="grey" />
                        </Box>
                      }
                      type={showReEnter ? 'text' : 'password'}
                      InputRightElement={
                        <Pressable onPress={() => setShowReEnter(!showReEnter)}>
                          <Box mx="3.5">
                            <MaterialIcons color="grey" size={24} name={showReEnter ? 'visibility' : 'visibility-off'} />
                          </Box>
                        </Pressable>
                      }
                      size="2xl"
                      w="100%"
                      // borderRadius="xl"
                      placeholder="Re-enter password"
                    />
                  </Box>
                  <Flex mt={8} w="100%">
                    <Button isLoading={user.loading} onPress={handleSubmit} h="16" bg="tertiary.600" borderRadius="xl">
                      <Heading size="lg" color="#FAFAFA">
                        Đăng ký
                      </Heading>
                    </Button>
                  </Flex>
                </FormControl>
              )}
            </Formik>
          </Center>

          {/* Divider */}
          <Flex justifyContent="center" direction="row" px={3.5} w="100%">
            <Flex w="2/5">
              <Divider my={2} />
            </Flex>
            <Flex justifyContent="center" alignItems="center" w="1/5">
              <Text color="muted.400"> Hoặc </Text>
            </Flex>
            <Flex w="2/5">
              <Divider my={2} />
            </Flex>
          </Flex>

          {/* Footer */}
          <Flex height="1/4" mt={12} justifyContent="center" alignItems="center" w="100%" px={3.5}>
            <Text color="text.500">
              {' '}
              Đã có tài khoản?{' '}
              <Text
                color="tertiary.600"
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                Đăng nhập
              </Text>{' '}
            </Text>
          </Flex>
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
