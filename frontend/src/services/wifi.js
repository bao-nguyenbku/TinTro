import request from 'utils/axios';

const prefix = '/wifi';

export const getWifiInfoService = (roomId) => {
  return request.get(`${prefix}/${roomId}`);
}
export const registerWifiService = (createData) => {
  return request.post(`${prefix}/${createData.roomId}/create`, createData);
}

export const deleteWifiService = (wifiId) => {
  return request.delete(`${prefix}/${wifiId}/delete`);
}