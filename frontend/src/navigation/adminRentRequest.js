import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import React from 'react';
import RequestList from 'screens/admin-rent-request/RequestList';

const Stack = createNativeStackNavigator();

const AdminRentRequest = () => {
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      header: (stackProps) => <CustomHeader {...stackProps} />,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      title: 'Yêu cầu thuê phòng',
    }}
    initialRouteName="AdminRentRequestList"
  >
    <Stack.Screen name="AdminRentRequestList" component={RequestList} />
  </Stack.Navigator>;
};

export default AdminRentRequest;
