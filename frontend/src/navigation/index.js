import AccommodationList from "screens/explore/AccommodationList";
import AccommodationDetailsScreen from "screens/explore/accommodation-details";
import SearchScreen from "screens/search";

export const ROUTES = {
  explore: {
    title: 'Explore',
    label: 'Khám phá',
    stack: {
      allAccommodations: {
        title: 'AllAccommodations',
        label: 'Tiềm năng',
        component: AccommodationList
      },
      accommodationDetails: {
        title: 'AccommodationDetails',
        label: 'Chi tiết',
        component: AccommodationDetailsScreen
      },
      searchAccommodation: {
        title: 'SearchAccommodation',
        label: 'Tìm kiếm',
        component: SearchScreen
      }
    }
  },
  myRoom: {
    title: 'MyRoom',
    label: 'Phòng của tôi',
    stack: {}
  },
  message: {
    title: 'Message',
    label: 'Tin nhắn',
    stack: {}
  },
  account: {
    title: 'Account',
    label: 'Tài khoản',
    stack: {}
  }
}
