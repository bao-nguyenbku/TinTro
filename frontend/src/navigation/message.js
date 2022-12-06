import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar, Box, HStack, Text } from 'native-base';
import { useDispatch } from 'react-redux';
import { MessagerList, SendMessage } from 'screens/message';
import { clearMessageSections } from 'store/reducer/message';
import ExploreHeader from 'components/header/ExploreHeader';

const Stack = createNativeStackNavigator();

const TitleHeaderOfMessageScreen = ({ name, avatar, navigation }) => {
  const dispatch = useDispatch();
  return (
    <Box bg="tertiary.600" height="90px" flexDirection="row" justifyContent="flex-start" alignItems="center" paddingTop="40px" paddingX="5">
      <HStack pr="8" space={2} alignItems="center">
        <Ionicons
          onPress={() => dispatch(clearMessageSections()) && navigation.navigate('MessagerList')}
          name="chevron-back-sharp"
          size={24}
          color="white"
        />
        <Avatar mr="2" w={42} h={42} source={{ uri: avatar }} />
        <Text fontSize="lg" color="#fff">
          {name}
        </Text>
      </HStack>
    </Box>
  );
};

const MessageNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: (stackProps) => <ExploreHeader {...stackProps} />,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          title: 'Tin nhắn',
        }}
        name="MessagerList"
        component={MessagerList}
      />
      <Stack.Screen
        name="SendMessage"
        component={SendMessage}
        options={({ route }) => ({
          header: (stackProps) => <TitleHeaderOfMessageScreen name={route.params.name} avatar={route.params.avatar} {...stackProps} />,

          headerTitleAlign: 'left',
        })}
      />
    </Stack.Navigator>
  );
};

export default MessageNav;
