import AccommodationList from "screens/explore/AccommodationList";
import AccommodationDetailsScreen from "screens/explore/accommodation-details";

export const ROUTES = {
  explore: {
    title: 'Explore',
    label: 'Khám phá',
    stack: {
      allAccommodations: {
        title: 'AllAccommodations',
        label: 'Tìm năng',
        component: AccommodationList
      },
      accommodationDetails: {
        title: 'AccommodationDetails',
        label: 'Chi tiết',
        component: AccommodationDetailsScreen
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
