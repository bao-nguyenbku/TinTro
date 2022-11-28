import React, { useState } from 'react';
import { Box, FormControl, Input, Pressable } from 'native-base';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

function LoginScreen() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box px="3.5" flex="1" w="100%" alignContent="center" justifyContent="center">
      <FormControl>
        <Box>
          <Input
            _hover={{ backgroundColor: '#fff' }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            InputLeftElement={
              <Box pl="3.5">
                <MaterialCommunityIcons name="email-outline" size={24} color="muted.500" />
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
                <Ionicons name="lock-closed-outline" size={24} color="muted.500" />
              </Box>
            }
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Box mx="3.5">
                  <MaterialIcons size={24} color="muted.500" name={show ? 'visibility' : 'visibility-off'} />
                </Box>
              </Pressable>
            }
            size="2xl"
            borderRadius="xl"
            placeholder="Password"
          />
        </Box>
      </FormControl>
    </Box>
  );
}

export default LoginScreen;
