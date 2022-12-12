import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import React from 'react';
import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AccountMenu from 'screens/account';
import AdminRoomStatistics from 'screens/account/AdminRoomStatistics';
import AdminRequestCheckoutRoomScreen from 'screens/admin-request-checkout-room';
import CreateCheckoutRequestScreen from 'screens/admin-request-checkout-room/create-checkout-request';
import RentRequestScreen from 'screens/rent-request';

const Stack = createNativeStackNavigator();

const adminAccountMenu = [
  <Stack.Screen
    options={{
      title: 'Thống kê',
    }}
    name="AdminRoomStatistics"
    component={AdminRoomStatistics}
  />,
  <Stack.Screen
    name="RentRequestList"
    component={RentRequestScreen}
    options={{
      title: 'Danh sách yêu cầu thuê phòng',
    }}
  />,
  <Stack.Screen
    name="AdminRequestCheckoutRoom"
    component={AdminRequestCheckoutRoomScreen}
    options={{
      title: 'Yêu cầu trả phòng',
    }}
  />,
  <Stack.Screen
    name="AdminCreateRequestCheckoutRoom"
    component={CreateCheckoutRequestScreen}
    options={{
      title: 'Tạo yêu cầu trả phòng',
    }}
  />,
];

const userAccountMenu = [
  <Stack.Screen
    name="RentRequestList"
    component={RentRequestScreen}
    options={{
      title: 'Danh sách yêu cầu thuê phòng',
    }}
  />,
];

const AccountNav = () => {
  const user = useSelector((state) => state.user);
  const role = user.currentUser.role;

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
