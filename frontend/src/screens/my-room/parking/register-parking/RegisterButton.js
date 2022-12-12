import React from "react";
import { Button, Text } from "native-base";


const RegisterButton = (props) => {
  const { onPress } = props; 
  return (
    <Button
      onPress={onPress}
    >
      <Text>Đăng ký</Text>
    </Button>
  )
}

export default RegisterButton;