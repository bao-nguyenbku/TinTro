import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ExploreScreen from 'screens/explore';
import MyRoomScreen from 'screens/my-room';
import MessageScreen from 'screens/message';

import { ROUTES } from 'navigation';
import { Ionicons } from '@expo/vector-icons';
import AccountNav from 'navigation/account';

const Tab = createBottomTabNavigator();

const RenderIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === ROUTES.explore.title) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === ROUTES.myRoom.title) {
    iconName = focused ? 'albums' : 'albums-outline';
  } else if (route.name === ROUTES.message.title) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === ROUTES.account.title) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

const UserBottomBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.explore.title}
      sceneContainerStyle="#F3F4F6"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => RenderIcon({ focused, color, size, route }),
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
        headerShown: false,
      })}
    >
      {Object.keys(ROUTES).map((tabScreen) => {
        let TabScreen;
        switch (ROUTES[tabScreen].title) {
          case ROUTES.explore.title: {
            TabScreen = ExploreScreen;
            break;
          }
          case ROUTES.myRoom.title: {
            TabScreen = MyRoomScreen;
            break;
          }
          case ROUTES.message.title: {
            TabScreen = MessageScreen;
            break;
          }
          case ROUTES.account.title: {
            TabScreen = AccountNav;
            break;
          }
          default:
            break;
        }
        return (
          <Tab.Screen
            name={ROUTES[tabScreen].title}
            key={tabScreen.toString()}
            children={() => <TabScreen {...ROUTES[tabScreen]} />}
            options={{
              title: ROUTES[tabScreen].label,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default UserBottomBar;
