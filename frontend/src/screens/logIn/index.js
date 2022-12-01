import React, { useState } from 'react';
import { Box, Button, Center, Flex, Heading, Input, Pressable, VStack, Text, FormControl } from 'native-base';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { logIn, resetData } from 'store/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from 'components/ErrorFormMessage';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup
    .string()
    .min(8, ({ min }) => `Mật khẩu phải có ít nhất ${min} ký tự`)
    .required('Mật khẩu không được để trống'),
});

function LoginScreen() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);

  const handleSubmitLogin = ({ email, password }) => {
    // done: navigate to home screen
    dispatch(
      logIn({
        email,
        password,
        done: () => {
          system.globalNavigation.navigate('HomeNav');
        },
      })
    );
  };

  useFocusEffect(() => {
    dispatch(resetData());
  });

  return (
    <VStack w="100%" space={3} alignItems="center">
      <Center w="100%" h="1/4">
        <Heading size="xl" color="tertiary.500">
          {' '}
          Chào mừng trở lại{' '}
        </Heading>
        <Text fontSize="lg">
          Đăng nhập vào <Text color="tertiary.600">TinTro</Text> ngay
        </Text>
        {user.error && <Text color="danger.600">{user.error}</Text>}
      </Center>
      <Center h="1/3" px="3.5" w="100%" alignItems="center" justifyContent="center">
        <Formik validationSchema={loginSchema} initialValues={{ email: '', password: '' }} onSubmit={(values) => handleSubmitLogin(values)}>
          {({ handleChange, handleSubmit, handleBlur, values, isValid, errors, touched }) => (
            <FormControl>
              <Box mb="3.5">
                {errors.email && touched.email && <ErrorMessage name="email" errors={errors} />}
                <Input
                  _hover={{ backgroundColor: '#fff' }}
                  InputLeftElement={
                    <Box pl="3.5">
                      <MaterialCommunityIcons name="email-outline" size={24} color="grey" />
                    </Box>
                  }
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  size="2xl"
                  borderRadius="xl"
                  w="100%"
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </Box>
              <Box mb="3.5">
                <Input
                  px="3"
                  w="100%"
                  InputLeftElement={
                    <Box pl="3.5">
                      <Ionicons name="lock-closed-outline" size={24} color="grey" />
                    </Box>
                  }
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
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
                  placeholder="Password"
                />
              </Box>
              <Flex h="1/4" mt={12} w="100%">
                <Button disabled={!isValid} onPress={() => handleSubmit()} type="submit" h="16" bg="tertiary.600" borderRadius="xl">
                  <Heading size="lg" color="#FAFAFA">
                    Đăng nhập
                  </Heading>
                </Button>
              </Flex>
            </FormControl>
          )}
        </Formik>
      </Center>

      <Flex h="2/3" pb={4}>
        <Text fontSize="lg" color="text.500">
          Chưa có tài khoản?{' '}
          <Text onPress={() => navigation.navigate('Register')} color="tertiary.600">
            Tạo ngay
          </Text>
        </Text>
      </Flex>
    </VStack>
  );
}

export default LoginScreen;
