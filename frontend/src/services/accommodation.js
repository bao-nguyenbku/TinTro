import request from "utils/axios";
const prefix = '/accommodations';

const getAllAccommodationsService = () => {
  return request.get(prefix);
}

export { getAllAccommodationsService };