import React from "react";
import { Button, Text } from "native-base";


const RegisterButton = (props) => {
  const { onPress } = props; 
  return (
    <Button
      onPress={onPress}
      bgColor='tertiary.600'
      height='12'
    >
      <Text color='white' fontWeight='700'>Đăng ký</Text>
    </Button>
  )
}

export default RegisterButton;