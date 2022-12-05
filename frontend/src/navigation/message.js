import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar, HStack, Text } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MessagerList, SendMessage } from 'screens/message';
import { clearMessageSections } from 'store/reducer/message';
import { headerOptions } from './constants';

const Stack = createNativeStackNavigator();

const TitleHeaderOfMessageScreen = ({ name, avatar, navigation }) => {
  const dispatch = useDispatch();
  return (
    <HStack pr="8" space={2} alignItems="center">
      <Ionicons onPress={() => dispatch(clearMessageSections()) && navigation.goBack()} name="chevron-back-sharp" size={24} color="white" />
      <Avatar mr="2" w={42} h={42} source={{ uri: avatar }} />
      <Text bold fontSize="lg" color="#fff">
        {name}
      </Text>
    </HStack>
  );
};

const MessageNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ ...headerOptions }} name="MessagerList" component={MessagerList} />
      <Stack.Screen
        name="SendMessage"
        component={SendMessage}
        options={({ route, navigation }) => ({
          headerStyle: {
            backgroundColor: '#059669',
          },
          headerTitleStyle: {
            color: '#fff',
          },
          title: '',
          headerLeft: () => <TitleHeaderOfMessageScreen navigation={navigation} name={route.params.name} avatar={route.params.avatar} />,

          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageNav;
