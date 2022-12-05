import 'intl';
import 'intl/locale-data/jsonp/it-IT';

const formatCurrency = Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND',
});

// eslint-disable-next-line consistent-return
const disableBottomTabBar = (props, options = {}) => {
  const { navigation } = props;
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
