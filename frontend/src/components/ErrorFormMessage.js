import { Text } from 'native-base';
import React from 'react';

const ErrorMessage = ({ name, errors }) => (errors[name] ? <Text color="danger.600">{errors[name]}</Text> : null);
export default ErrorMessage;
