import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from 'components/header';

import React from 'react';
import AdminMyAccommodation from 'screens/admin-my-accommodation';
import NewRoomForm from 'screens/admin-my-accommodation/NewRoomForm';

const Stack = createNativeStackNavigator();

const AdminExploreNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminAccommodationList" component={AdminMyAccommodation} />
      <Stack.Screen
        name="NewRoomForm"
        options={{
          headerShown: true,
          header: (stackProps) => <CustomHeader {...stackProps} />,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Thêm phòng mới',
        }}
        component={NewRoomForm}
      />
    </Stack.Navigator>
  );
};

export default AdminExploreNav;
