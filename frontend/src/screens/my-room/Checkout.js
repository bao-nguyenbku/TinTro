import React from 'react';
import { Box, Text, VStack, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ConfirmModal from 'components/confirm-modal';
import { CONFIRM_MODAL } from 'constants';

const CheckoutMenuItem = () => {
  const { onOpen, isOpen, onClose } = useDisclose();
  const onConfirm = () => {
    console.log('Confirm');
  }
  return (
    <>
      <TouchableOpacity
        onPress={onOpen}
      >
        <Box
          bgColor='white'
          flexDirection='row'
          alignItems='center'
          width='80%'
          p='3'
        >
          <Box
            bgColor='danger.100'
            p='2'
            rounded='full'
            marginRight='2'
          >
            <Ionicons name='swap-horizontal-outline' size={24} color='#F43F5E'/>
          </Box>
          <VStack  space="1" alignItems="flex-start">  
            <Text fontWeight='700' color='danger.500'>Trả phòng</Text>
            <Text color='muted.400'>Gửi yêu cầu trả phòng</Text>
          </VStack>
          
          <Ionicons name='chevron-forward-outline' size={24} style={{
            marginLeft: 'auto',
            color: '#ABABAB'
          }}/>
        </Box>
      </TouchableOpacity>
      <ConfirmModal 
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        headerTitle='Xác nhận yêu cầu'
        content='Bạn có chắc chắn muốn trả phòng?'
        cancelTitle='Hủy'
        saveTitle='Trả phòng'
        onConfirm={onConfirm}
        status={CONFIRM_MODAL.DELETE}
      />
    </>
  )
}

export default CheckoutMenuItem;
