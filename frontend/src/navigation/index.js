import AccommodationList from 'screens/explore/AccommodationList';
import AccommodationDetailsScreen from 'screens/explore/accommodation-details';
import SearchScreen from 'screens/search';

import AdminAccommodationDetailsScreen from 'screens/admin-explore/AdminAcommodationDetails';
import AdminNEWAccommodationScreen from 'screens/admin-explore/AdminNEWAccommodation';

// export const ROUTES = {
//     explore: {
//         title: 'Explore',
//         label: 'Khám phá',
//         stack: {
//             allAccommodations: {
//                 title: 'AllAccommodations',
//                 label: 'Tiềm năng',
//                 component: AccommodationList,
//             },
//             accommodationDetails: {
//                 title: 'AccommodationDetails',
//                 label: 'Chi tiết',
//                 component: AccommodationDetailsScreen,
//             },
//             searchAccommodation: {
//                 title: 'SearchAccommodation',
//                 label: 'Tìm kiếm',
//                 component: SearchScreen,
//             },
//         },
//     },
//     myRoom: {
//         title: 'MyRoom',
//         label: 'Phòng của tôi',
//         stack: {},
//     },
//     message: {
//         title: 'Message',
//         label: 'Tin nhắn',
//         stack: {},
//     },
//     account: {
//         title: 'Account',
//         label: 'Tài khoản',
//         stack: {},
//     },
// };

export const ROUTES = {
    adminExplore: {
        title: 'Explore',
        label: 'Nhà trọ của tôi',
        stack: {
            adminAccommodationDetails: {
                title: 'AdminAccommodationDetails',
                label: 'Tổng quan phòng',
                component: AdminAccommodationDetailsScreen,
            },
            adminNEWAccommodation: {
                title: 'adminCRUDAccommodation',
                label: 'Thêm phòng mới',
                component: AdminNEWAccommodationScreen,
            },
        },
    },
    rentRequest: {
        title: 'Request',
        label: 'Yêu cầu',
        stack: {},
    },
    message: {
        title: 'Message',
        label: 'Tin nhắn',
        stack: {},
    },
    account: {
        title: 'Account',
        label: 'Tài khoản',
        stack: {},
    },
};