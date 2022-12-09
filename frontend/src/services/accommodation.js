import request from 'utils/axios';

const prefix = '/accommodations';

const getAllAccommodationsService = () => {
  return request.get(`${prefix}/all`);
};
const searchAccommodationByKeywordService = (keyword) => {
  return request.get(`${prefix}?search=${keyword}`);
}
const requestRentRoomService = ({ accommodationId, email }) => {
  return request.post(`${prefix}/${accommodationId}/request-rent`, { email });
}
const getRequestByRenterService = ({ accommodationId }) => {
  return request.get(`${prefix}/${accommodationId}/request-rent`);
}
const getRecommendAccommodationsService = () => {
  return request.get(`${prefix}/all/recommend`);
}
export { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService, getRequestByRenterService, getRecommendAccommodationsService };
