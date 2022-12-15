import request from "utils/axios";

export const reviewByRenterService = ({ accommodationId, points }) => {
  return request.post(`/review`, { accommodationId, rating: points });
}