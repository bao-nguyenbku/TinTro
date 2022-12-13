import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import React from 'react';
import RequestList from './RequestList';

const Stack = createNativeStackNavigator();

const AdminRentRequest = () => {
  <Stack.Navigator initialRouteName="RequestList">
    <Stack.Screen
      options={{
        headerShown: true,
        header: (stackProps) => <CustomHeader {...stackProps} />,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        title: 'Yêu cầu thuê phòng',
      }}
      name="RequestList"
      component={RequestList}
    />
  </Stack.Navigator>;
};

export default AdminRentRequest;
