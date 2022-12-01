import request from "utils/axios";

const prefix = '/accommodations';

const getAllAccommodationsService = () => request.get(prefix)

export { getAllAccommodationsService };