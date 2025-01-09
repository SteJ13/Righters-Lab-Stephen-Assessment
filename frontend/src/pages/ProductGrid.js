import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import  DataTable from '../components/Grid';
import '../assets/css/productgrid.css';

import {parseCurrency} from '../utils'

const fetchData = async (selectedTable) => {
  let apiUrl = "";
  if (selectedTable === "location") {
    apiUrl = "/api/locationData";
  } else if (selectedTable === "branch") {
    apiUrl = "/api/branchData";
  }

  const response = await axios.get(apiUrl);
  return response.data;
};

const ProductGrid = () => {
  const [selectedTable, setSelectedTable] = useState("location");
  const [locationData, setLocationData] = useState([]);
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    const fetchDataForTable = async () => {
      try {
        const data = await fetchData(selectedTable);
        if (selectedTable === "location") {
          setLocationData(data);
        } else if (selectedTable === "branch") {
          setBranchData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForTable();
  }, [selectedTable]);

  const calculatedLocationData = useMemo(() => locationData, [locationData]);
  const calculatedBranchData = useMemo(() => branchData, [branchData]);

  return (
    <div className="product-grid">
      <div className="primary-view-container">
        <span className="primary-view-label">Primary View</span>
        <select
            onChange={(e) => setSelectedTable(e.target.value)}
            value={selectedTable}
            className="select-input"
        >
            <option value="location">Location</option>
            <option value="branch">Branch</option>
        </select>
      </div>

      <DataTable 
        calculatedLocationData={calculatedLocationData} 
        calculatedBranchData={calculatedBranchData} 
        selectedTable={selectedTable}
      />

    </div>
  );
};

export default ProductGrid;
