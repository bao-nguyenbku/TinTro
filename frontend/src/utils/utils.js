import 'intl';
import 'intl/locale-data/jsonp/it-IT';
// import { CONFIRM_MODAL } from 'constants';

const formatCurrency = Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND',
}).format;

// eslint-disable-next-line consistent-return
const disableBottomTabBar = (navigation, options = {}) => {
  const { action = 'disable' } = options;
  if (action === 'disable') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }
  if (action === 'clean') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: undefined,
    });
  }
};

export { formatCurrency, disableBottomTabBar };
