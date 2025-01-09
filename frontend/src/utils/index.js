export const parseCurrency = (currencyStr) => {
  if (!currencyStr || typeof currencyStr !== 'string') {
    console.warn('Invalid currency string:', currencyStr); 
    return 0; 
  }
  return parseFloat(currencyStr.replace(/[^0-9.-]+/g, ''));
};

export const formatToKOrM = (value) => {
  if (typeof value === "number") {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  } else if (typeof value === "string") {
    const num = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  }
  return `$0.00`;
};


export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  export const calculatePercentages = (data, totalColumn) => {
    const totalValue = data.reduce((acc, row) => acc + parseFloat(row[totalColumn].replace(/[^0-9.-]+/g, '')), 0);
    
    return data.map((row) => ({
      ...row,
      [`${totalColumn} Percentage`]: totalValue ? ((parseFloat(row[totalColumn].replace(/[^0-9.-]+/g, '')) / totalValue) * 100).toFixed(2) + '%' : '0%',
    }));
  };
  