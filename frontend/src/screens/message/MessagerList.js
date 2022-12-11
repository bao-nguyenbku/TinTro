import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessageSections } from 'store/reducer/message';
import Loading from 'components/loading';
import Error from 'components/error';
<<<<<<< HEAD
import { Avatar, Flex, Heading, Pressable, ScrollView, Text, VStack } from 'native-base';
=======
import { Avatar, Flex, Heading, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
>>>>>>> remotes/origin/ntb/checkout-when-renting
import { formatDate } from 'utils/formatDate';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

const MessagerList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { messageSections, loading, error } = useSelector((state) => state.message);
  const navigation = useNavigation();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) dispatch(fetchMessageSections({ done: () => {} }));
  }, [isFocus, dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return !messageSections.length ? (
    <Flex alignSelf="center" justifyContent="center" alignItems="center" h="full">
      <Text color="coolGray.500">Bạn không có tin nhắn nào</Text>
    </Flex>
  ) : (
    <ScrollView
      refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchMessageSections())} />}
      h="100%"
      backgroundColor="coolGray.100"
    >
      <VStack py="4" h="100%" space={1}>
        {messageSections.map((section) => {
          const messages = section.messages;
          const from = messages.length && messages[0].from;
          const fromId = messages.length && messages[0].fromId;
          const otherUser = section.users.find((userInSection) => userInSection.id !== user.currentUser.id);

          return !messages.length ? null : (
            <Pressable
              onPress={() =>
                navigation.navigate('SendMessage', {
                  messageSectionId: section.id,
                  fromId: user.currentUser.id === fromId ? otherUser.id : fromId,
                  avatar: user.currentUser.id === fromId ? otherUser.avatar : from.avatar,
                  name: user.currentUser.id === fromId ? otherUser.name : from.name,
                })
              }
              my="2"
              h="100px"
              key={section.id}
              w="full"
            >
              {({ isPressed }) => (
<<<<<<< HEAD
                <VStack
                  borderRadius={12}
                  h="full"
                  alignItems="center"
                  mx="6"
                  space={2}
                  backgroundColor={isPressed ? 'muted.200' : '#fff'}
                  flexDirection="row"
                  px="4"
                >
                  <Flex mr={2} pr={2} w="1/6">
                    <Avatar size="md" borderRadius="full" source={{ uri: otherUser.avatar }} />
                  </Flex>
                  <VStack w="2/3" space={1.5}>
=======
                <HStack borderRadius={12} h="full" alignItems="center" mx="6" space={2} backgroundColor={isPressed ? 'muted.200' : '#fff'} px="4">
                  <Flex mr={2} pr={2} w="1/6">
                    <Avatar size="md" borderRadius="full" source={{ uri: otherUser.avatar }} />
                  </Flex>
                  <VStack w="1/2" space={1.5}>
>>>>>>> remotes/origin/ntb/checkout-when-renting
                    <Heading fontSize="md" color="#000">
                      {otherUser.name}
                    </Heading>

                    <Text isTruncated maxW="300" noOfLines={1} fontSize="xs" color="muted.500">
                      {fromId === user?.currentUser?.id && 'Bạn: '} {messages[0].text}
                    </Text>
                  </VStack>
<<<<<<< HEAD
                  <Flex mt="12" h="full">
                    <Text color="muted.500" fontSize="xs">
                      {formatDate(messages[0].createdAt)}
                    </Text>
                  </Flex>
                </VStack>
=======
                  <Flex wrap="wrap" left={4} w="auto" mt="12" h="full">
                    <Text color="muted.500" fontSize="xs">
                      {formatDate(messages[0].createdAt, 'MM/DD HH:mm')}
                    </Text>
                  </Flex>
                </HStack>
>>>>>>> remotes/origin/ntb/checkout-when-renting
              )}
            </Pressable>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

export default MessagerList;
