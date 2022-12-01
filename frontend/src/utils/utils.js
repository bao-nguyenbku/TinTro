import 'intl';
import 'intl/locale-data/jsonp/it-IT';

const formatter = Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND',

})

export const formatCurrency = formatter.format;