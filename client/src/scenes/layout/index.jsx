import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const drawerWidth = 250;

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth={drawerWidth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // Use marginLeft to "push" the content when the sidebar is open
          // and set it to 0 when closed so the content slides left
          marginLeft: isNonMobile && isSidebarOpen ? 0 : `-${drawerWidth}px`,
          transition: "margin 0.3s ease-in-out",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
