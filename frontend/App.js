import React, { useState } from 'react';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import MyApp from './src';
import store from './src/store';

SplashScreen.preventAutoHideAsync();
export default function App() {
  enableScreens(false);
  const [isReady, setIsReady] = useState(false);

  setTimeout(() => {
    SplashScreen.hideAsync().then(() => setIsReady(true));
  }, 2000);

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