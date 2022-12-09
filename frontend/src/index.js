import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from 'navigation/authentication';
import HomeNav from 'navigation/home';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from 'store/reducer/user';
import Loading from 'components/loading';

const Stack = createNativeStackNavigator();
const Index = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, [dispatch, user.loggedIn]);

  return (
    <>
      <StatusBar style="auto" />
      {user.isLoading ? (
        <Loading />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!user.loggedIn ? <Stack.Screen name="Authentication" component={LoginNav} /> : <Stack.Screen name="Home" component={HomeNav} />}
        </Stack.Navigator>
      )}
    </>
  );
};
export default Index;
