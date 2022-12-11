import React from 'react';

import { useSelector } from 'react-redux';
import { selectUserState } from 'store/reducer/user';

import UserBottomBar from 'components/user-bottom-bar';
import AdminBottomBar from 'components/admin-bottom-bar';
import Loading from 'components/loading';

const HomeNav = () => {
  const { currentUser, loading } = useSelector(selectUserState);
  console.log(currentUser);
  if (loading) {
    return <Loading />;
  }
  if (currentUser.role === 'USER') {
    return <UserBottomBar />;
  }
  if (currentUser.role === 'ADMIN') {
    return <AdminBottomBar />;
  }
  return null;
};

export default HomeNav;
