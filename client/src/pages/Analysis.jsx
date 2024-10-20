import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import DisplayWeatherData from "../components/DisplayWeatherData";
import { useLocation } from "react-router-dom";
import DisplayFertilizerData from "../components/DisplayFertilizerData";
import MarketAnalysis from "../components/MarketAnalysis";
import PesticideDashboard from "../components/PesticideDashboard";

// Helper function for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Utility function to assign props to tabs for accessibility
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Analysis = () => {
  const loc = useLocation();
  const { state: formData } = loc;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="analysis tabs">
        <Tab label="Irrigation" {...a11yProps(0)} />
        <Tab label="Fertilizer" {...a11yProps(1)} />
        <Tab label="Market Price Analysis" {...a11yProps(2)} />
        <Tab label="Pesticide Usage" {...a11yProps(3)} />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        <DisplayWeatherData data={formData} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DisplayFertilizerData initialData={formData} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <MarketAnalysis />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <PesticideDashboard />
      </TabPanel>
    </Box>
  );
};

export default Analysis;
