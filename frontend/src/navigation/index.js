import AccommodationList from 'screens/explore/AccommodationList';
import AccommodationDetailsScreen from 'screens/explore/accommodation-details';
import SearchScreen from 'screens/search';
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
