import request from 'utils/axios';

const prefix = '/accommodations';

export const getAllAccommodationsService = () => {
  return request.get(`${prefix}/all`);
};
export const searchAccommodationByKeywordService = (keyword) => {
  return request.get(`${prefix}?search=${keyword}`);
}
export const requestRentRoomService = ({ accommodationId }) => {
  return request.get(`${prefix}/${accommodationId}/request-rent`);
}
export const getAllRequestByRenterService = () => {
  return request.get(`${prefix}/all-rent-request`);
}
export const getRecommendAccommodationsService = () => {
  return request.get(`${prefix}/all/recommend`);
}

export const requestCheckoutRoomService = ({ accommodationId, roomId }) => {
  return request.post(`${prefix}/${accommodationId}/rooms/${roomId}/request-checkout`);
}

export const cancelRentRequestService = (requestId) => {
  return request.delete(`${prefix}/request-rent/${requestId}`);
}
