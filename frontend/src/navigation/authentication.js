import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setGlobalNavigation } from 'store/reducer/system';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';

const Stack = createNativeStackNavigator();

const LoginNav = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setGlobalNavigation({ navigation }));
  }, [navigation, dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default LoginNav;
