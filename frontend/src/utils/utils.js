import 'intl';
import 'intl/locale-data/jsonp/it-IT';

const formatCurrency = Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND',

}).format;

const disableBottomTabBar = (props, options = {}) => {
  const { navigation } = props;
  const { action = 'disable' } = options;
  if (action === 'disable') {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      },
    })
  }
  else if (action === 'clean') {
    return navigation.getParent()?.setOptions({
      tabBarStyle: undefined,
    });
  }
}

export { formatCurrency, disableBottomTabBar };