import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import AdminMyAccommodation from 'screens/admin-my-accommodation';

const Stack = createNativeStackNavigator();

const AdminExploreNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminAccommodationList" component={AdminMyAccommodation} />
    </Stack.Navigator>
  );
};

export default AdminExploreNav;
