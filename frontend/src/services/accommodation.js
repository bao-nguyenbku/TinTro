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
export { getAllAccommodationsService, searchAccommodationByKeywordService, requestRentRoomService };
