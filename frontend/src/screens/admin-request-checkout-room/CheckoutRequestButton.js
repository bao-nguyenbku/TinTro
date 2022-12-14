import React from 'react';
import { Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const CheckoutRequestButton = () => {
  const navigation = useNavigation();
  return (
   
      <Button
        bgColor='tertiary.600'
        width='full'
        mx='auto'
        _pressed={{
          opacity: 0.8
        }}
        onPress={() => navigation.navigate('AdminCreateRequestCheckoutRoom')}
        height='50px'
      >
        <Text color='white' fontWeight='bold'>Tạo yêu cầu mới</Text>
      </Button>
   
  )
}

export default CheckoutRequestButton;
