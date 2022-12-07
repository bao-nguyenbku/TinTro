import { useState } from 'react';
import { Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

// TODO: Temporary use constant height value. Will update later
export const useHeaderHeight = () => {
  const [height] = useState({
    headerHeight: 90,
    statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT
  })
  return height;
};
