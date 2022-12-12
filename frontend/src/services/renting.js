import request from 'utils/axios';

const prefix = '/renting';

export const getRoomInfoService = () => {
  return request.get(`${prefix}`);
}
export const requestCheckoutRoomService = ({ rentingId }) => {
  return request.get(`${prefix}/${rentingId}/checkout`);
}
export const getAllCheckoutRequestService = () => {
  return request.get(`${prefix}/all`);
}
export const requestRenterCheckoutByOwnerService = (data) => {
  return request.post(`${prefix}/owner-checkout`, data);
}