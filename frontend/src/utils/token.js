// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const jwtParse = (accessToken) => {
  const decoded = jwt_decode(accessToken);
  return decoded;
};

// TODO: get token, and set token to local storage
export const setToken = (_accessToken) => {};

export const getToken = (_accessToken) => {};
