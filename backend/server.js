import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

const locationTable = [
  {
    location: "Colorado",
    potentialRevenueAnnualized: "$624,596",
    competitorProcessingVolumeAnnualized: "$52,049,666",
    competitorMerchantAnnualized: "195",
    revenuePerAccountAnnualized: "$3,203",
    marketShareByRevenue: "33.33%",
    commercialDdas: "220"
  },
  {
    location: "Florida",
    potentialRevenueAnnualized: "$600,628",
    competitorProcessingVolumeAnnualized: "$52,049,666",
    competitorMerchantAnnualized: "195",
    revenuePerAccountAnnualized: "$3,203",
    marketShareByRevenue: "33.33%",
    commercialDdas: "220"
  },
  {
    location: "Mississippi",
    potentialRevenueAnnualized: "$640,596",
    competitorProcessingVolumeAnnualized: "$51,385,666",
    competitorMerchantAnnualized: "198",
    revenuePerAccountAnnualized: "$3,114",
    marketShareByRevenue: "33.33%",
    commercialDdas: "792"
  }
];

const branchTable = [
  {
    location: "Branch 1",
    potentialRevenueAnnualized: "$878,269",
    competitorProcessingVolumeAnnualized: "$73,189,083",
    competitorMerchantAnnualized: "287",
    revenuePerAccountAnnualized: "$3,060",
    marketShareByRevenue: "33.33%",
    commercialDdas: "1,148",
    locationData: "Colorado"
  },
  {
    location: "Branch 2",
    potentialRevenueAnnualized: "$822,775",
    competitorProcessingVolumeAnnualized: "$68,564,583",
    competitorMerchantAnnualized: "257",
    revenuePerAccountAnnualized: "$3,201",
    marketShareByRevenue: "33.33%",
    commercialDdas: "1,028",
    locationData: "Florida"
  },
  {
    location: "Branch 3",
    potentialRevenueAnnualized: "$817,009",
    competitorProcessingVolumeAnnualized: "$68,084,083",
    competitorMerchantAnnualized: "252",
    revenuePerAccountAnnualized: "$3,242",
    marketShareByRevenue: "33.33%",
    commercialDdas: "1,008",
    locationData: "Mississippi"
  }
];


app.use(cors());

app.get('/api/locationData', (req, res) => {
  res.json(locationTable);
});

app.get('/api/branchData', (req, res) => {
  res.json(branchTable);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
