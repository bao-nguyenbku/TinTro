import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from 'routes';
import ExploreScreen from 'screens/explore';
import MyRoomScreen from 'screens/my-room';
import MessageScreen from 'screens/message';
import AccountScreen from 'screens/account';
import Header from 'components/header';
const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <>
      <StatusBar style='light' />
      <Tab.Navigator
        initialRouteName={ROUTES.explore}
        sceneContainerStyle='#F3F4F6'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === ROUTES.explore) {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === ROUTES.myRoom) {
              iconName = focused ? 'albums' : 'albums-outline';
            }
            else if (route.name === ROUTES.message) {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }
            else if (route.name === ROUTES.account) {
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
          header: (props) => <Header {...props} />
        })}
      >
        <Tab.Screen name={ROUTES.explore} component={ExploreScreen} />
        <Tab.Screen name={ROUTES.myRoom} component={MyRoomScreen} />
        <Tab.Screen name={ROUTES.message} component={MessageScreen} />
        <Tab.Screen name={ROUTES.account} component={AccountScreen} />
      </Tab.Navigator>
    </>

  )
}

export default Index;
