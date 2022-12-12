import AccommodationList from 'screens/explore/AccommodationList';
import AccommodationDetailsScreen from 'screens/explore/accommodation-details';
import SearchScreen from 'screens/search';
import RentRequestScreen from 'screens/rent-request';
import ParkingScreen from 'screens/my-room/parking';
import WifiScreen from 'screens/my-room/wifi';
import RoomMenu from 'screens/my-room/RoomMenu';
import RegisterParking from 'screens/my-room/parking/register-parking';
import RegisterWifi from 'screens/my-room/wifi/register-wifi';

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
    stack: {
      roomMenu: {
        title: 'RoomMenu',
        label: 'Phòng của tôi',
        component: RoomMenu,
      },
      parking: {
        title: 'Parking',
        label: 'Gửi xe',
        component: ParkingScreen
      },
      registerParking: {
        title: 'RegisterParking',
        label: 'Đăng ký mới',
        component: RegisterParking
      },
      wifi: {
        title: 'Wifi',
        label: 'Wifi',
        component: WifiScreen
      },
      registerWifi: {
        title: 'RegisterWifi',
        label: 'Đăng ký mới',
        component: RegisterWifi
      }
    },
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
