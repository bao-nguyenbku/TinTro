import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AdminExploreScreen from 'screens/admin-explore';
import { ADMIN_ROUTES } from 'navigation';
import { Ionicons } from '@expo/vector-icons';
import AdminRentRequest from 'screens/admin-rent-request';
import MessageNav from 'navigation/message';
import AccountNav from 'navigation/account';

const Tab = createBottomTabNavigator();

const RenderIcon = ({ route, focused, color, size }) => {
  let iconName;
  if (route.name === ADMIN_ROUTES.myAccomm.title) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === ADMIN_ROUTES.request.title) {
    iconName = focused ? 'file-tray-full' : 'file-tray-full-outline';
  } else if (route.name === ADMIN_ROUTES.message.title) {
    iconName = focused ? 'chatbox' : 'chatbox-outline';
  } else if (route.name === ADMIN_ROUTES.account.title) {
    iconName = focused ? 'person' : 'person-outline';
  }

  // You can return any component that you like here!
  return <Ionicons name={iconName} size={size} color={color} />;
};

const AdminBottomBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={ADMIN_ROUTES.myAccomm.title}
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
      {Object.keys(ADMIN_ROUTES).map((tabScreen) => {
        let TabScreen;
        switch (ADMIN_ROUTES[tabScreen].title) {
          case ADMIN_ROUTES.myAccomm.title: {
            TabScreen = AdminExploreScreen;
            break;
          }
          case ADMIN_ROUTES.request.title: {
            TabScreen = AdminRentRequest;
            break;
          }
          case ADMIN_ROUTES.message.title: {
            TabScreen = MessageNav;
            break;
          }
          case ADMIN_ROUTES.account.title: {
            TabScreen = AccountNav;
            break;
          }
          default:
            break;
        }
        return (
          <Tab.Screen
            name={ADMIN_ROUTES[tabScreen].title}
            key={tabScreen.toString()}
            children={() => <TabScreen {...ADMIN_ROUTES[tabScreen]} />}
            options={{
              title: ADMIN_ROUTES[tabScreen].label,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default AdminBottomBar;
