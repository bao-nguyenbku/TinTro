import { useIsFocused } from '@react-navigation/native';
import { ScrollView, Text } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initWebsocket, sendMessage } from 'store/reducer/message';
import { getToken } from 'utils/token';

const SendMessage = ({ route }) => {
  const { fromId, name, avatar } = route.params;
  const messageSectionId = route.params?.messageSectionId;
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [messageText, setMessageText] = React.useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const message = useSelector((state) => state.message);
  const allMessagesFromSection = message.messages;
  // *This function will handle send websocket message *//

  // * ------------------ Side effects to init websocket ------------------ * //
  useEffect(() => {
    if (isFocus) {
      // get user token and then init websocket
      getToken().then((token) => {
        if (messageSectionId) {
          dispatch(initWebsocket({ messageSectionId, token }));
        } else {
          dispatch(initWebsocket({ fromId, token }));
        }
      });
    }
  }, [isFocus, dispatch, fromId, messageSectionId]);

  const sendMessageHandler = () => {
    dispatch(sendMessage({ messageText }));
  };

  console.log(allMessagesFromSection);
  return (
    <ScrollView>
      {allMessagesFromSection?.map((messageInSection) => {
        return <Text>{messageInSection.text}</Text>;
      })}
    </ScrollView>
  );
};

export default SendMessage;
