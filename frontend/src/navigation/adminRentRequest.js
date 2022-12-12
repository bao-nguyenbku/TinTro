import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';
import RequestList from 'screens/admin-rent-request/RequestList';
import React from 'react';

const Stack = createNativeStackNavigator();

const AdminRentRequest = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AdminRentRequests"
        options={{
          headerShown: true,
          header: (stackProps) => <CustomHeader {...stackProps} />,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Yêu cầu thuê phòng',
        }}
        component={RequestList}
      />
    </Stack.Navigator>
  );
};

export default AdminRentRequest;
