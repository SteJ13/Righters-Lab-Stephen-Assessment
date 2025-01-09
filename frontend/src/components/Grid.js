import React, { useState } from "react";
import {formatToKOrM, parseCurrency}  from '../utils';

const DataTable = ({ calculatedLocationData, calculatedBranchData, selectedTable }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const data = selectedTable === "location" ? calculatedLocationData : calculatedBranchData;
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = parseFloat(a[sortConfig.key]?.replace(/[^0-9.-]+/g, "")) || 0;
      const bValue = parseFloat(b[sortConfig.key]?.replace(/[^0-9.-]+/g, "")) || 0;
      return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
    });
  }, [sortConfig, calculatedLocationData, calculatedBranchData, selectedTable]);

  const calculateTotals = (data) => {
  const totals = {
    location: "Total",
    potentialRevenueAnnualized: 0,
    competitorProcessingVolumeAnnualized: 0,
    competitorMerchantAnnualized: 0,
    revenueAccountAnnualized: 0,
    marketShareByRevenue: 0,
    commercialDDAs: 0,
    action: "",
  };

  data.forEach((row) => {
    totals.potentialRevenueAnnualized += parseCurrency(row.potentialRevenueAnnualized);
    totals.competitorProcessingVolumeAnnualized += parseCurrency(row.competitorProcessingVolumeAnnualized);
    totals.competitorMerchantAnnualized += parseFloat(row.competitorMerchantAnnualized) || 0;
    totals.revenueAccountAnnualized += parseCurrency(row.revenueAccountAnnualized);
    totals.commercialDDAs += parseFloat(row.commercialDDAs) || 0;
  });

  if (totals.competitorProcessingVolumeAnnualized > 0) {
    totals.marketShareByRevenue = "100.00%";
  } else {
    totals.marketShareByRevenue = "0.00%";
  }

  totals.potentialRevenueAnnualized = formatToKOrM(totals.potentialRevenueAnnualized);
  totals.competitorProcessingVolumeAnnualized = formatToKOrM(totals.competitorProcessingVolumeAnnualized);
  totals.revenueAccountAnnualized = formatToKOrM(totals.revenueAccountAnnualized);
  totals.commercialDDAs = formatToKOrM(totals.commercialDDAs);

  return totals;
};

  
  

  const dataToDisplay = selectedTable === "location" ? calculatedLocationData : calculatedBranchData;
  const totals = calculateTotals(dataToDisplay);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("location")}>Location <span>...</span></th>
          <th onClick={() => handleSort("potentialRevenueAnnualized")}>
            Potential Revenue <br />
            <small>(Annualized)</small> <span>...</span>
          </th>
          <th onClick={() => handleSort("competitorProcessingVolumeAnnualized")}>
            Competitor Processing Volume <br />
            <small>(Annualized)</small> <span>...</span>
          </th>
          <th onClick={() => handleSort("competitorMerchantAnnualized")}>
            Competitor Merchant <br />
            <small>(Annualized)</small> <span>...</span>
          </th>
          <th onClick={() => handleSort("revenueAccountAnnualized")}>
            Revenue/Account <br />
            <small>(Annualized)</small> <span>...</span>
          </th>
          <th onClick={() => handleSort("marketShareByRevenue")}>
            Market Share <br />
            <small>(By Revenue)</small> <span>...</span>
          </th>
          <th>Commercial DDA's</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="totals-row">
          <td>Total</td>
          <td>{totals.potentialRevenueAnnualized}</td>
          <td>{totals.competitorProcessingVolumeAnnualized}</td>
          <td>{totals.competitorMerchantAnnualized}</td>
          <td>{totals.revenuePerAccountAnnualized}</td>
          <td>{totals.marketShareByRevenue}</td>
          <td>{totals.commercialDdas}</td>
          <td></td>
        </tr>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>{row.location}</td>
            <td>{row.potentialRevenueAnnualized}</td>
            <td>{row.competitorProcessingVolumeAnnualized}</td>
            <td>{row.competitorMerchantAnnualized}</td>
            <td>{row.revenuePerAccountAnnualized}</td>
            <td>{row.marketShareByRevenue}</td>
            <td>{row.commercialDdas}</td>
            <td>{row.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
