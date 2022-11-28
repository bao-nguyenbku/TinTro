import React, { useState } from 'react';
import { Box, Button, Center, Flex, Divider, Heading, Input, Pressable, Text, VStack } from 'native-base';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { register } from 'store/reducer/user';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

const registerSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  name: yup.string().required(),
  phone: yup.string().required(),
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
  const [show, setShow] = useState(false);
  const [showReEnter, setShowReEnter] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmitRegister = (values) => {
    console.log(values);
    dispatch(register(values));
  };

  return (
    <VStack w="100%" space={3} alignItems="center">
      {/* Header */}
      <Center mt={12} w="100%" h="1/6">
        <Heading size="xl"> Tạo ngay tài khoản </Heading>
        <Heading size="xl">
          {' '}
          để khám phá <Text color="tertiary.600">TinTro</Text>{' '}
        </Heading>
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
          {({ handleChange, handleSubmit, handleBlur, values, isValid }) => (
            <>
              <Box>
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
                  borderRadius="xl"
                  mb="3.5"
                  w="100%"
                  placeholder="Username"
                />
              </Box>
              <Box>
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
                  mb="3.5"
                  w="100%"
                  placeholder="Email"
                />
              </Box>
              <Box>
                <Input
                  InputLeftElement={
                    <Box pl="3.5">
                      <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
                    </Box>
                  }
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  size="2xl"
                  borderRadius="xl"
                  mb="3.5"
                  w="100%"
                  placeholder="Số điện thoại"
                />
              </Box>
              <Box>
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
                  mb="3.5"
                  w="100%"
                  placeholder="Password"
                />
              </Box>
              <Box>
                <Input
                  px="3"
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
                  mb="3.5"
                  w="100%"
                  borderRadius="xl"
                  placeholder="Re-enter password"
                />
              </Box>
              <Flex mt={8} w="100%">
                <Button disabled={!isValid} onPress={handleSubmit} h="16" bg="tertiary.600" borderRadius="xl">
                  <Heading size="lg" color="#FAFAFA">
                    Đăng ký
                  </Heading>
                </Button>
              </Flex>
            </>
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

      <Flex mt={12  } justifyContent="center" alignItems="center" w="100%" px={3.5}>
        <Text color="text.500">
          {' '}
          Đã có tài khoản?{' '}
          <Text color="tertiary.600" onPress={() => navigation.navigate('Login')}>
            Đăng nhập
          </Text>{' '}
        </Text>
      </Flex>
    </VStack>
  );
}

export default RegisterScreen;
