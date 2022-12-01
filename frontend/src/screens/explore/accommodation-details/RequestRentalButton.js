import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
const RequestRentalButton = () => {
  return (
    <TouchableOpacity>
      <Button 
        bgColor='tertiary.600' 
        height='16' 
        _text={{
          color: 'white',
          fontSize: 'xl',
          fontWeight: 'bold'
        }}
        onPress={() => console.log(Math.random())}
        _pressed={{
          opacity: 0.8
        }}
      >Yêu cầu thuê phòng</Button>
    </TouchableOpacity>
  )
}

export default RequestRentalButton;
