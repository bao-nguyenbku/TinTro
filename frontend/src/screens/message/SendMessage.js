import { Octicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Avatar, Box, Flex, Input, Pressable, ScrollView, Text, VStack } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushMessage, sendMessage, setMessages } from 'store/reducer/message';
import { getToken } from 'utils/token';
import { WS_BASE_URL } from '@env';
import { io } from 'socket.io-client';

const socketUrl = `${WS_BASE_URL}/message`;

const SendMessage = ({ route }) => {
  const { fromId } = route.params;
  const messageSectionId = route.params?.messageSectionId;
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [messageText, setMessageText] = React.useState('');
  const message = useSelector((state) => state.message);
  const allMessagesFromSection = message.messages;
  const navigation = useNavigation();
  const socketRef = useRef();
  // *This function will handle send websocket message *//

  // * ------------------ Side effects to init websocket ------------------ * //
  useEffect(() => {
    if (isFocus) {
      // get user token and then init websocket
      getToken().then((token) => {
        // hide bottom bar
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: 'none',
          },
        });

        const socket = io(socketUrl, {
          auth: {
            token,
          },
          query: {
            messageSectionId,
            receiverId: fromId,
          },
        });
        // * Add listners to socket * //
        socket.on('connect', () => {
          console.log('Connected to websocket');
        });
        socket.emit('fetch-all-messages');
        socket.on('client-all-past-messages', (data) => {
          dispatch(setMessages(data));
        });
        socket.on('client-receive-message', (data) => {
          dispatch(pushMessage({ message: data }));
        });
        socketRef.current = socket;
      });
    }
    // !xu ly disconnect socket
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
      socketRef.current?.disconnect();
    };
  }, [isFocus, dispatch, fromId, messageSectionId, navigation]);

  const sendMessageHandler = () => {
    if (messageText === '') return;
    dispatch(sendMessage({ messageText, socket: socketRef.current }));
    setMessageText('');
  };

  let pos = 'row-reverse';
  return (
    <VStack py={4} px={4}>
      <ScrollView py={4} h="90%">
        {allMessagesFromSection?.map((messageInSection) => {
          if (currentUser.id === messageInSection.fromId) {
            pos = 'row-reverse';
          } else {
            pos = 'row';
          }
          return (
            <Flex my="4" key={messageInSection.id} w="100%">
              <Flex alignItems="flex-end" direction={pos}>
                <Avatar mx={2} size="sm" source={{ uri: messageInSection.from.avatar }} />
                <Box alignItems="center" p={3} borderRadius="2xl" backgroundColor={messageInSection.fromId === currentUser.id ? 'tertiary.600' : '#fff'}>
                  <Text color={messageInSection.fromId === currentUser.id ? '#fff' : '#000'} fontSize={16}>
                    {messageInSection.text}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </ScrollView>
      <Input
        mt="5"
        borderRadius={999}
        value={messageText}
        onChangeText={(text) => setMessageText(text)}
        InputRightElement={
          <Pressable onPress={() => sendMessageHandler()}>
            {({ isHovered }) => (
              <Box backgroundColor={isHovered ? 'muted.200' : ''} mr={3.5}>
                <Octicons name="paper-airplane" size={24} color="#059669" />
              </Box>
            )}
          </Pressable>
        }
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessageHandler();
          }
        }}
      />
    </VStack>
  );
};

export default SendMessage;
