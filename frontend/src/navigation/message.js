import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MessagerList, SendMessage } from 'screens/message';
import { headerOptions } from './constants';

const Stack = createNativeStackNavigator();

const MessageNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ ...headerOptions }} name="MessagerList" component={MessagerList} />
      <Stack.Screen name="SendMessage" component={SendMessage} />
    </Stack.Navigator>
  );
};

export default MessageNav;
