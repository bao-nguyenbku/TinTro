import { useHeaderHeight } from "@react-navigation/elements";

export const useTopHeight = () => {
  const headerHeight = useHeaderHeight();
  const statusBar = 20; // iOS status bar height
  return headerHeight + statusBar;
}