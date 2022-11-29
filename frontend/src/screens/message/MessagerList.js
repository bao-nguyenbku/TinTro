import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MessagerList = () => {
  const user = useSelector((state) => state.user.currentUser);

  if (!user) {
    // TODO: Redirect to login page
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // Get list of users that have message the current user
  });

  // render list of users that have message the current user
  return <></>;
};

export default MessagerList;
