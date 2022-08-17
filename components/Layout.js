import React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PhoneBook from "./PhoneBook";

const Layout = () => {
  const [value, setValue] = React.useState("3");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Phone Book" value="1" />
            <Tab label="Log in" value="2" />
            <Tab label="Sign up" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <PhoneBook />
        </TabPanel>
        <TabPanel value="2">
          <div>Log in</div>
        </TabPanel>
        <TabPanel value="3">
        <div>Sign up</div>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Layout;
