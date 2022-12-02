import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from 'navigation/authentication';
import HomeNav from 'navigation/home';
import { useSelector } from 'react-redux';
import { isEmptyObj } from 'native-base';

const Stack = createNativeStackNavigator();

const Index = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <StatusBar style='auto' />
      <Tab.Navigator
        initialRouteName={ROUTES.explore.title}
        sceneContainerStyle='#F3F4F6'
        screenOptions={({ route }) => ({
          tabBarStyle: {
            display: 'absolute'
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === ROUTES.explore.title) {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === ROUTES.myRoom.title) {
              iconName = focused ? 'albums' : 'albums-outline';
            }
            else if (route.name === ROUTES.message.title) {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }
            else if (route.name === ROUTES.account.title) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#059669',
          tabBarInactiveTintColor: '#71717A',
          tabBarStyle: {
            position: 'absolute',
            overflow: 'hidden',
            left: 0,
            bottom: 0,
            right: 0,
            justifyContent: 'center',
          },
          // TODO: Temporary disable bottom tab nav header
          // header: (props) => <Header {...props} />
          headerShown: false
        })}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isEmptyObj(user.currentUser) && <Stack.Screen name="Authentication" component={LoginNav} />}
        <Stack.Screen name="Home" component={HomeNav} />
      </Stack.Navigator>
    </>
  );
};
export default Index;
