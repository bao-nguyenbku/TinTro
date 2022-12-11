import request from "utils/axios";

const prefix = '/admin-accommodation';

export const getAllRooms = ({ adminId }) => {
    return request.get(`${adminId}/${prefix}/get-all-room`);
};

export const newRoom = ({ adminId }) => {
    return request.post(`${adminId}/${prefix}/new-room`);
};

export const modifyRoom = ({ adminId }, keyword) => {
    return request.put(`${adminId}/${prefix}/modify-room?roomId=${keyword}`);
};

export const deleteRoom = ({ adminId }, keyword) => {
    return request.delete(`${adminId}/${prefix}/delete-room?roomId=${keyword}`);
}

export const getAllRentRequest = ({ adminId }) => {
    return request.get(`${adminId}/${prefix}/all-rent-request`);
}

export const acceptRequest = ({ adminId }) => {
    return request.put(`${adminId}/${prefix}/accept-rent-request`);
}

export const addRenterToRoom = ({ adminId }, roomId, renterId) => {
    return request.post(`${adminId}/${prefix}/add-renter-to-room?roomId=${roomId}&renterId=${renterId}`);
}