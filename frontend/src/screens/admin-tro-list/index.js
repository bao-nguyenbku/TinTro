import React, { useState } from 'react';
import { Box, Button, Center, Flex, Heading, Input, Pressable, VStack, Text, FormControl } from 'native-base';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { logIn } from 'store/reducer/user';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from 'components/ErrorFormMessage';

function AdminTroList() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmitLogin = ({ email, password }) => {
    // done: navigate to home screen

    dispatch(
      logIn({
          email,
          password,
          done: () => {
            // rootNavigation.navigate('Home');
          },
      })
    );
  };
  
    return (    
        <view>
            <Text>Hello</Text>
        </view>
    );
}

export default AdminTroList;