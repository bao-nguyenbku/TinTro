import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const useContainerHeight = () => {
  const headerHeight = useHeaderHeight();
  const { height } = useWindowDimensions();
  const bottomBarHeight = useBottomTabBarHeight();
  const [containerHeight] = useState(height - headerHeight - bottomBarHeight);
  return containerHeight;
};
