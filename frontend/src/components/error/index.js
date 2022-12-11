<<<<<<< HEAD
import React from 'react';
import { Box, Text } from 'native-base';

const Error = (props) => {
  // TODO: Implement Error component here
  const { message } = props;
  return (
    <Box justifyContent="center">
      <Text color="danger.600">{message || 'Lỗi '}</Text>
    </Box>
  );
};

export default Error;
=======
import React from 'react';
import { Box, Text } from 'native-base';

const Error = (props) => {
  // TODO: Implement Error component here
  const { message } = props;
  return (
    <Box justifyContent="center">
      <Text color="danger.600">{message || 'Lỗi '}</Text>
    </Box>
  );
};

export default Error;
>>>>>>> remotes/origin/ntb/checkout-when-renting
