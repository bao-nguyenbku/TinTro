import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { useSelector } from 'react-redux';
import { selectUserState } from 'store/reducer/user';
import { ROUTES } from 'navigation';
import { Ionicons } from '@expo/vector-icons';
import UserBottomBar from 'components/user-bottom-bar';
import AdminBottomBar from 'components/admin-bottom-bar';
import Loading from 'components/loading';





const HomeNav = () => {
  const { currentUser, loading } = useSelector(selectUserState);
  console.log(currentUser);
  if (loading) {
    return <Loading />
  }
  if (currentUser.role === 'USER') {
    return <UserBottomBar />
  }
  if (currentUser.role === 'ADMIN') {
    return <AdminBottomBar />
  }
};

export default HomeNav;
