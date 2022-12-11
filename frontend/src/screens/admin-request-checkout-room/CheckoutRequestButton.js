import React from 'react';
import { Button, Text } from 'native-base';

const CheckoutRequestButton = ({ navigation }) => {
  return (
   
      <Button
        bgColor='tertiary.600'
        width='95%'
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
