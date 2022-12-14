import React from 'react';
import { Avatar, Box, Pressable, Text } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Linking } from 'react-native';

const OwnerContact = (props) => {
  const { item, handlePressMessageIcon } = props;
  const { owner } = item;

  return (
    <Box bgColor="white" p="3" rounded="full" flexDirection="row" alignItems="center">
      <Avatar
        source={{
          uri: owner?.avatar,
        }}
        alt="avatar"
        size={42}
        rounded="full"
      />
      <Box flexDirection="row" flexGrow={1} marginLeft="2">
        <Box>
          <Text fontWeight="700" fontSize="md">
            {owner?.name}
          </Text>
          <Text>{owner?.phone}</Text>
        </Box>
        <Box marginLeft="auto" marginRight={0} flexDirection="row" justifyContent="center" alignItems="center">
          <Pressable onPress={() => handlePressMessageIcon()}>
            {({ isPressed }) => (
              <Box
                bgColor={isPressed ? 'tertiary.200' : 'coolGray.100'}
                p="2"
                rounded="full"
                width="42px"
                height="42px"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="chatbubble-ellipses" size={20} color="#737373" />
              </Box>
            )}
          </Pressable>

          <Pressable
            onPress={() => Linking.openURL(`tel://${owner?.phone}`)}
          >
            {({ isPressed }) => (
              <Box
                bgColor={isPressed ? 'tertiary.200' : 'coolGray.100'}
                p="2"
                rounded="full"
                width="42px"
                height="42px"
                alignItems="center"
                justifyContent="center"
                marginLeft="2"
              >
                <Ionicons name="call" size={20} color="#737373" />
              </Box>
            )}
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerContact;
