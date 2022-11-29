import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MessagerList, SendMessage } from 'screens/message';

const Stack = createNativeStackNavigator();

/**
 * Note: This is a placeholder for the MessageNav component.
 * Since Message will be located in side the bottom bar, so the bottom bar must include all of these
 */

const MessageNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="MessagerList" component={MessagerList} />
    <Stack.Screen name="SendMessage" component={SendMessage} />
  </Stack.Navigator>
);

export default MessageNav;
