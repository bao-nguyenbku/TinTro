import AccommodationList from 'screens/explore/AccommodationList';
import AccommodationDetailsScreen from 'screens/explore/accommodation-details';
import SearchScreen from 'screens/search';
<<<<<<< HEAD

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
=======
import RentRequestScreen from 'screens/rent-request';

export const ROUTES = {
  explore: {
    title: 'Explore',
    label: 'Khám phá',
    stack: {
      allAccommodations: {
        title: 'AllAccommodations',
        label: 'Tìm phòng trọ tốt nhất cho bạn',
        component: AccommodationList,
      },
      accommodationDetails: {
        title: 'AccommodationDetails',
        label: 'Chi tiết',
        component: AccommodationDetailsScreen,
      },
      searchAccommodation: {
        title: 'SearchAccommodation',
        label: 'Tìm kiếm',
        component: SearchScreen,
      },
    },
  },
  myRoom: {
    title: 'MyRoom',
    label: 'Phòng của tôi',
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
    stack: {
      rentRequest: {
        title: 'RentRequestList',
        label: 'Danh sách yêu cầu thuê phòng',
        component: RentRequestScreen
      }
    },
  },
};

export const ADMIN_ROUTES = {
  myAccomm: {
    title: 'MyAccomm',
    label: 'Nhà trọ của tôi',
    stack: {
      allRoom: {
        title: 'AllRoom',
        label: '',
      }
    }
  },
  request: {
    title: 'Request',
    label: 'Yêu cầu',
    stack: {
    }
  },
  message: {
    title: 'Message',
    label: 'Tin nhắn',
    stack: {},
  },
  account: {
    title: 'Account',
    label: 'Tài khoản',
    stack: {}
  }
}
>>>>>>> remotes/origin/ntb/checkout-when-renting
