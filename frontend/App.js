import React, { useState } from 'react';
import { store } from './src/store';
import { Provider } from 'react-redux';
import MyApp from './src';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

SplashScreen.preventAutoHideAsync();
export default function App() {
  enableScreens(false);
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
