import { Text } from 'react-native';
import { store } from './src/store';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import MyApp from './src';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [isReady, setIsReady] = useState(false);
  setTimeout(() => {
    SplashScreen.hideAsync().then(() => setIsReady(true))
  }, 2000)
  if (isReady) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <NativeBaseProvider>
            <MyApp />
          </NativeBaseProvider>
        </NavigationContainer>
      </Provider>
    );
  }
}
