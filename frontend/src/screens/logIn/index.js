import React from 'react';
import { Box, FormControl, Input } from 'native-base';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

function LoginScreen() {
  return (
    <Box px="3.5" flex="1" w="100%" alignContent="center" justifyContent="center">
      <FormControl>
        <Box>
          <Input
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
            px="3"
            InputLeftElement={
              <Box pl="3.5">
                <Ionicons name="lock-closed-outline" size={24} color="grey" />
              </Box>
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
