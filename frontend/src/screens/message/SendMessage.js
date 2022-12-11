import { Octicons } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Avatar, Box, Flex, Input, Pressable, ScrollView, Text, VStack, KeyboardAvoidingView } from 'native-base';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushMessage, sendMessage, setMessages } from 'store/reducer/message';
import { getToken } from 'utils/token';
import { WS_BASE_URL } from '@env';
import { io } from 'socket.io-client';
import { disableBottomTabBar } from 'utils/utils';
import { Platform, RefreshControl } from 'react-native';
import { useHeaderHeight } from 'hooks/useHeaderHeight';

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
  const { headerHeight, statusBarHeight } = useHeaderHeight();
  const scrollRef = useRef();
  // *This function will handle send websocket message *//

  // * ------------------ Side effects to init websocket ------------------ * //
  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    if (isFocus) {
      // get user token and then init websocket
      getToken().then((token) => {
        // hide bottom bar
        disableBottomTabBar(navigation);

        const socket = io(socketUrl, {
          auth: {
            token,
          },
          query: {
            // only one is sent, the other one is gonna be null
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
          scrollToBottom();
        });
        socket.on('client-receive-message', (data) => {
          dispatch(pushMessage({ message: data }));
          scrollToBottom();
        });
        socketRef.current = socket;
      });
    }
    // !xu ly disconnect socket
    return () => {
      disableBottomTabBar(navigation, { action: 'clean' });
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
    <KeyboardAvoidingView
      onTouchStart={() => {}}
      flex={1}
      keyboardVerticalOffset={Platform.OS === 'ios' && headerHeight + statusBarHeight}
      behavior={Platform.OS === 'ios' && 'padding'}
    >
      <VStack px={2}>
        <ScrollView
          ref={(e) => {
            scrollRef.current = e;
          }}
          automaticallyAdjustContentInsets
          refreshControl={<RefreshControl refreshing={message.loading} onRefresh={() => socketRef.current.emit('fetch-all-messages')} />}
          h="90%"
        >
          {allMessagesFromSection?.map((messageInSection) => {
            if (currentUser.id === messageInSection.fromId) {
              pos = 'row-reverse';
            } else {
              pos = 'row';
            }
            return (
              <Flex pb={3} my={1} key={messageInSection.id} w="100%">
                <Flex maxWidth={pos === 'row' ? '75%' : '80%'} left={pos === 'row-reverse' ? 20 : 0} alignItems="flex-end" direction={pos}>
                  <Avatar mx={1.5} size="sm" source={{ uri: messageInSection.from.avatar }} />
                  <Box
                    alignItems="center"
                    py={1.5}
                    px={3}
                    borderRadius="2xl"
                    backgroundColor={messageInSection.fromId === currentUser.id ? 'tertiary.600' : '#fff'}
                  >
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
          borderRadius={999}
          backgroundColor="#fff"
          value={messageText}
          flexWrap="wrap"
          bottom={3}
          py={2}
          px={4}
          mb={3}
          placeholder="Message"
          size="2xl"
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
          onSubmitEditing={() => sendMessageHandler()}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') sendMessageHandler();
          }}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default SendMessage;
