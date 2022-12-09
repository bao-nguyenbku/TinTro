import request from 'utils/axios';

const prefix = '/accommodations';

const getAllAccommodationsService = () => {
  return request.get(`${prefix}/all`);
};
const searchAccommodationByKeywordService = (keyword) => {
  return request.get(`${prefix}?search=${keyword}`);
}
const requestRentRoomService = ({ accommodationId }) => {
  return request.get(`${prefix}/${accommodationId}/request-rent`);
}
const getAllRequestByRenterService = () => {
  return request.get(`${prefix}/all-rent-request`);
}
const getRecommendAccommodationsService = () => {
  return request.get(`${prefix}/all/recommend`);
}

export { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService, getAllRequestByRenterService, getRecommendAccommodationsService };
