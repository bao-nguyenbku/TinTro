import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { selectUserState } from './store/reducer/user';
import { Box, AspectRatio, Center, Stack, Heading, HStack } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ROUTES } from 'routes';
import ExploreScreen from 'screens/explore';
import MyRoomScreen from 'screens/my-room';
import MessageScreen from 'screens/message';
import AccountScreen from 'screens/account';
import Header from 'components/Header';
const Tab = createBottomTabNavigator();

const Example = () => {
  return <Box alignItems="center">
    <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{
            uri: "https://images.unsplash.com/photo-1669570094762-828f3dfaf675?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }} alt="image" />
        </AspectRatio>
        <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs",
        }} position="absolute" bottom="0" px="3" py="1.5">
          PHOTOS
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            The Garden City
          </Heading>
          <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
            The Silicon Valley of India.
          </Text>
        </Stack>
        <Text fontWeight="400">
          Bengaluru (also called Bangalore) is the center of India's high-tech
          industry. The city is also known for its parks and nightlife.
        </Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              6 mins ago
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  </Box>;
};
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
            borderRadius: 999,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    color: '#17bd00'
  }
})