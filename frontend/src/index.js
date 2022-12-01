
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from 'navigation/authentication';
import HomeNav from 'navigation/home';

const Stack = createNativeStackNavigator();



const Index = () => (
    <>

      <StatusBar/>
      <Stack.Navigator>
        <Stack.Screen name="Authentication" component={LoginNav} />
        <Stack.Screen name="Home" component={HomeNav} />
      </Stack.Navigator>
    </>

  )

export default Index;
