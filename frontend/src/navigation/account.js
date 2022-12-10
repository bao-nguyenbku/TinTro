import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import React from 'react';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AccountMenu from 'screens/account';
import AdminRoomStatistics from 'screens/account/AdminRoomStatistics';

const Stack = createNativeStackNavigator();

const adminAccountMenu = [<Stack.Screen name="AdminRoomStatistics" component={AdminRoomStatistics} />];
const userAccountMenu = [];

const AccountNav = () => {
  const user = useSelector((state) => state.user);
  const role = user.currentUser.role;
  console.log('====================================');
  console.log(role);
  console.log('====================================');
  return (
    <Stack.Navigator
      screenOptions={{
        header: (stackProps) => <CustomHeader {...stackProps} />,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        title: 'Trang cá nhân',
      }}
      initialRouteName="AccountMenu"
    >
      <Stack.Screen name="AccountMenu" component={AccountMenu} />
      {role === 'ADMIN' ? adminAccountMenu : userAccountMenu}
    </Stack.Navigator>
  );
};

export default AccountNav;
