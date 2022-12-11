import request from 'utils/axios';

const prefix = '/renting';

const getRoomInfoService = () => {
  return request.get(`${prefix}`);
}
const requestCheckoutRoomService = ({ rentingId }) => {
  return request.get(`${prefix}/${rentingId}/checkout`);
}
export { getRoomInfoService, requestCheckoutRoomService };