// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const jwtParse = (accessToken) => {
  const decoded = jwt_decode(accessToken);
  return decoded;
};

export const tokenKey = 'accessToken';

// TODO: get token, and set token to local storage
export const setToken = async (_accessToken) => {
  try {
    await AsyncStorage.setItem(tokenKey, _accessToken);
  } catch (err) {
    console.error(err);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(tokenKey);
    if (token) return token;
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
