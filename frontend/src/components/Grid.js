import React, { useEffect, useState } from "react";
import { formatToKOrM, parseCurrency } from "../utils";

const DataTable = ({ memoizedLocationData, memoizedBranchData, selectedTable }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [locationFilter, setLocationFilter] = useState(null);

  useEffect(()=>{
    setDataToDisplay(selectedTable === "location" ? memoizedLocationData : memoizedBranchData);
    setLocationFilter(null);
  },[selectedTable, memoizedLocationData, memoizedBranchData])

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return dataToDisplay;

    return [...dataToDisplay].sort((a, b) => {
      const aValue = parseFloat(a[sortConfig.key]?.replace(/[^0-9.-]+/g, "")) || 0;
      const bValue = parseFloat(b[sortConfig.key]?.replace(/[^0-9.-]+/g, "")) || 0;
      return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
    });
  }, [sortConfig, dataToDisplay]);

  const calculateTotals = (data) => {
    const totals = {
      location: "Total",
      potentialRevenueAnnualized: 0,
      competitorProcessingVolumeAnnualized: 0,
      competitorMerchantAnnualized: 0,
      revenuePerAccountAnnualized: 0,
      marketShareByRevenue: 0,
      commercialDdas: 0,
    };

    data.forEach((row) => {
      totals.potentialRevenueAnnualized += parseCurrency(row.potentialRevenueAnnualized);
      totals.competitorProcessingVolumeAnnualized += parseCurrency(
        row.competitorProcessingVolumeAnnualized
      );
      totals.competitorMerchantAnnualized += parseFloat(row.competitorMerchantAnnualized) || 0;
      totals.revenuePerAccountAnnualized += parseCurrency(row.revenuePerAccountAnnualized);
      totals.commercialDdas += parseFloat(row.commercialDdas) || 0;
    });

    if (totals.competitorProcessingVolumeAnnualized > 0) {
      totals.marketShareByRevenue = "100.00%";
    } else {
      totals.marketShareByRevenue = "0.00%";
    }

    totals.potentialRevenueAnnualized = formatToKOrM(totals.potentialRevenueAnnualized);
    totals.competitorProcessingVolumeAnnualized = formatToKOrM(
      totals.competitorProcessingVolumeAnnualized
    );
    totals.revenuePerAccountAnnualized = formatToKOrM(totals.revenuePerAccountAnnualized);
    totals.commercialDdas = formatToKOrM(totals.commercialDdas);

    return totals;
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...dataToDisplay];
    updatedData.splice(index, 1);
    setDataToDisplay(updatedData);
  };

  const handleFilter = (row) => {
    if (selectedTable === "location" && !locationFilter) {
      const branches = memoizedBranchData.filter(res=>res.locationData === row.location)
      setDataToDisplay(branches);
      setLocationFilter(row.location);
    }
  }

  const totals = calculateTotals(dataToDisplay);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("location")}>
            Location <span>...</span>
          </th>
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
          <th onClick={() => handleSort("revenuePerAccountAnnualized")}>
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
          <td className={locationFilter?'location-selected':''}>{locationFilter || 'Total'}</td>
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
            <td 
              className={selectedTable === "location" && !locationFilter ? "location-filterable":""}
              onClick={()=>handleFilter(row)}
            >{row.location}</td>
            <td>{row.potentialRevenueAnnualized}</td>
            <td>{row.competitorProcessingVolumeAnnualized}</td>
            <td>{row.competitorMerchantAnnualized}</td>
            <td>{row.revenuePerAccountAnnualized}</td>
            <td>{row.marketShareByRevenue}</td>
            <td>{row.commercialDdas}</td>
            <td>
              <button onClick={() => handleDeleteRow(index)} className="delete-icon">
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
