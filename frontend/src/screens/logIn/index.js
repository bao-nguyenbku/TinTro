import React, { useState } from 'react';
import { Box, Button, Center, Flex, FormControl, Heading, Input, Pressable, VStack, Text } from 'native-base';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logIn } from 'store/reducer/user';
import { useDispatch } from 'react-redux';

function LoginScreen() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(logIn({ email, password }));
  };

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
      </Center>
      <Center h="1/3" px="3.5" w="100%" alignItems="center" justifyContent="center">
        <FormControl>
          <Box>
            <Input
              type="email"
              _hover={{ backgroundColor: '#fff' }}
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              _hover={{ backgroundColor: '#fff' }}
              value={password}
              onChangeText={(text) => setPassword(text)}
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
              placeholder="Password"
            />
          </Box>
        </FormControl>
      </Center>
      <Flex h="1/4" px="3.5" w="100%">
        <Button onPress={() => handleSubmit()} h="16" bg="tertiary.600" borderRadius="xl">
          <Heading size="lg" color="#FAFAFA">
            Đăng nhập
          </Heading>
        </Button>
      </Flex>

      <Flex h="auto" pb={4}>
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
