import request from 'utils/axios';

const prefix = '/parking';

export const getParkingInfoService = () => {
  return request.get(`${prefix}`);
}
export const registerParkingService = (createData) => {
  return request.post(`${prefix}/create`, createData);
}

export const deleteParkingService = (parkingId) => {
  return request.delete(`${prefix}/${parkingId}/delete`);
}