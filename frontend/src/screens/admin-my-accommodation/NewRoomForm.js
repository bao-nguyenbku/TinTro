import React from 'react';
import { Box, Button, Center, Heading, Input, FormControl, KeyboardAvoidingView, ScrollView, useToast, Text } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import ErrorMessage from 'components/ErrorFormMessage';
import { createNewRoom } from 'store/reducer/accommodation';

const newRoomSchema = yup.object().shape({
  roomName: yup.string().required('Tên phòng không được để trống'),
  personNumber: yup.number(),
});

const NewRoomForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { error } = useSelector((state) => state.accommodation);

  const handleSubmitNewRoom = (values) => {
    dispatch(
      createNewRoom({
        values,
        done: () => {
          toast.show({
            title: 'Tạo phòng thành công',
            status: 'success',
            duration: 2000,
            isClosable: true,
            placement: 'top',
          });
          navigation.goBack();
        },
      })
    );
  };

  return (
    <KeyboardAvoidingView w="100%" alignItems="center" flex={1}>
      <ScrollView w="100%" py={4}>
        <Center mb={8}>
          <Heading fontSize={20}> Thông tin chung </Heading>
          <Text color="danger.500"> {error} </Text>
        </Center>
        <Box alignItems="center">
          <Formik
            validationSchema={newRoomSchema}
            initialValues={{ roomName: '', personNumber: 0 }}
            onSubmit={(values) => handleSubmitNewRoom(values)}
          >
            {({ handleChange, handleSubmit, handleBlur, values, isValid, errors, touched }) => (
              <FormControl h="full" px={5}>
                <Box mb={6}>
                  <FormControl.Label isRequired>Tên phòng</FormControl.Label>
                  {errors.roomName && touched.roomName && <ErrorMessage name="roomName" errors={errors} />}
                  <Input placeholder="Tên phòng" value={values.roomName} onChangeText={handleChange('roomName')} onBlur={handleBlur('roomName')} />
                </Box>
                <Box mb={6}>
                  <FormControl.Label isRequired>Số người tối đa</FormControl.Label>
                  {errors.personNumber && touched.personNumber && <ErrorMessage name="personNumber" errors={errors} />}
                  <Input
                    placeholder="Số người tối đa"
                    value={values.personNumber}
                    onChangeText={handleChange('personNumber')}
                    onBlur={handleBlur('personNumber')}
                  />
                </Box>

                <Button onPress={() => handleSubmit()} bg={!isValid ? 'muted.200' : 'tertiary.600'}>
                  Tạo phòng
                </Button>
              </FormControl>
            )}
          </Formik>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewRoomForm;
