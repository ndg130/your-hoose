import React from 'react';
import PropTypes from 'prop-types';

function MoneyFormatter({ amount }) {
  const formatAsMoney = (number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  return <span>{formatAsMoney(amount)}</span>;
}

export default MoneyFormatter;

MoneyFormatter.propTypes = {
    amount: PropTypes.number.isRequired
}
