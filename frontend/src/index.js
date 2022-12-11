import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from 'navigation/authentication';
import HomeNav from 'navigation/home';
import { useDispatch, useSelector } from 'react-redux';
<<<<<<< HEAD
import { isEmptyObj } from 'native-base';
=======
>>>>>>> remotes/origin/ntb/checkout-when-renting
import { authMe } from 'store/reducer/user';
import Loading from 'components/loading';

const Stack = createNativeStackNavigator();
const Index = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
<<<<<<< HEAD
  }, [dispatch]);
=======
  }, [dispatch, user.loggedIn]);
>>>>>>> remotes/origin/ntb/checkout-when-renting

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
<<<<<<< HEAD
          {isEmptyObj(user.currentUser) && <Stack.Screen name="Authentication" component={LoginNav} />}
          <Stack.Screen name="Home" component={HomeNav} />
=======
          {!user.loggedIn ? <Stack.Screen name="Authentication" component={LoginNav} /> : <Stack.Screen name="Home" component={HomeNav} />}
>>>>>>> remotes/origin/ntb/checkout-when-renting
        </Stack.Navigator>
      )}
    </>
  );
};
export default Index;
