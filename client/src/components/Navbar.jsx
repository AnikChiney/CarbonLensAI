import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "state";
import { removeCredentials } from "state/authSlice";

import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  alpha,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isLight = theme.palette.mode === "light";

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // 🔥 State for search text
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user || userInfo;

  // 🔥 Functional Search Logic
  const handleSearchTrigger = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      const query = searchInput.toLowerCase().trim();
      
      // Routing logic based on keywords
      if (query.includes("carbon")) navigate("/carbon-footprint");
      else if (query.includes("water")) navigate("/water-usage");
      else if (query.includes("news") || query.includes("global")) navigate("/global-news");
      else if (query.includes("local")) navigate("/local-news");
      else if (query.includes("top") || query.includes("headline")) navigate("/top-headlines");
      else if (query.includes("tip")) navigate("/ecofriendly-tips");
      else if (query.includes("who") || query.includes("standard")) navigate("/who-standards");
      else if (query.includes("dashboard")) navigate("/dashboard");
      
      setSearchInput(""); // Clear input after search
    }
  };

  const logoutHandler = () => {
    dispatch(removeCredentials());
    navigate("/login");
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: isLight 
          ? alpha(theme.palette.background.default, 0.8) 
          : alpha("#0f2027", 0.7),
        borderBottom: `1px solid ${isLight ? theme.palette.grey[100] : "rgba(255,255,255,0.08)"}`,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 3 } }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1rem">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ color: theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search - Responsive width & Functional */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              px: 2,
              py: 0.5,
              width: "260px",
              border: isLight ? `1px solid ${theme.palette.grey[200]}` : "none",
            }}
          >
            <Search sx={{ opacity: 0.6, mr: 1, color: theme.palette.text.primary }} />
            <InputBase
              placeholder="Search analytics..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchTrigger} // 🔥 Listener for Enter key
              sx={{
                color: theme.palette.text.primary,
                fontSize: "0.9rem",
                width: "100%",
              }}
            />
          </Box>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={{ xs: "0.5rem", sm: "1.5rem" }}>
          <IconButton onClick={() => dispatch(setMode())} sx={{ color: theme.palette.text.primary }}>
            {theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>

          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              gap: "0.8rem",
              borderRadius: "12px",
              px: 1,
              backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.05)",
              border: isLight ? `1px solid ${theme.palette.grey[100]}` : "none",
            }}
          >
            <Box
              component="img"
              src="profile.png"
              alt="profile"
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />

            <Box textAlign="left" sx={{ display: { xs: "none", md: "block" } }}>
              <Typography fontWeight="bold" fontSize="0.8rem" color={theme.palette.text.primary}>
                {user?.fname || user?.name || "User"}
              </Typography>
              <Typography fontSize="0.65rem" color={theme.palette.text.secondary}>
                {user?.city || "West Bengal"}
              </Typography>
            </Box>

            <ArrowDropDownOutlined 
                sx={{ 
                    color: isLight ? theme.palette.grey[400] : "rgba(255,255,255,0.4)",
                    display: { xs: "none", sm: "block" } 
                }} 
            />
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            disableScrollLock={true}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.text.primary,
                borderRadius: "12px",
                mt: 1.5,
                minWidth: 180,
                boxShadow: isLight ? "0px 10px 25px rgba(0,0,0,0.1)" : theme.shadows[10],
                border: isLight ? `1px solid ${theme.palette.grey[100]}` : "none",
              },
            }}
          >
            <Box px={2} py={1} sx={{ display: { md: "none" } }}>
                 <Typography variant="body2" fontWeight="bold">
                    {user?.fname || user?.name}
                 </Typography>
            </Box>
            
            <MenuItem
              onClick={logoutHandler}
              sx={{
                py: 1.5,
                gap: 2,
                color: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: isLight ? "#fff5f5" : "rgba(216, 34, 34, 0.1)",
                },
              }}
            >
              <LogoutOutlined fontSize="small" />
              <Typography fontWeight="600">Log Out</Typography>
            </MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;