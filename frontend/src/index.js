import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from 'navigation/authentication';
import HomeNav from 'navigation/home';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Index = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <StatusBar />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user.currentUser && <Stack.Screen name="Authentication" component={LoginNav} />}
        <Stack.Screen name="Home" component={HomeNav} />
      </Stack.Navigator>
    </>
  );
};
export default Index;
