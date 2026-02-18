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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // ✅ Get user directly from Redux (persisted via localStorage)
  const { userInfo } = useSelector((state) => state.auth);

  // Handles both:
  // { name: "Shuvam" }
  // { user: { name: "Shuvam" } }
  const user = userInfo?.user || userInfo;

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
        background: "rgba(15, 32, 39, 0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1rem">
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              px: 2,
              py: 0.5,
              width: "260px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <Search sx={{ opacity: 0.6, mr: 1 }} />
            <InputBase
              placeholder="Search analytics..."
              sx={{
                color: "#fff",
                fontSize: "0.9rem",
                width: "100%",
              }}
            />
          </Box>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>

          {/* PROFILE SECTION */}
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              gap: "0.8rem",
              borderRadius: "12px",
              px: 2,
              py: 0.5,
              backgroundColor: "rgba(255,255,255,0.05)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            <Box
              component="img"
              src="profile.png"
              alt="profile"
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            />

            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: "#fff", lineHeight: 1.2 }}
              >
                {user?.fname || user?.name || "User"}
              </Typography>

              <Typography
                fontSize="0.7rem"
                sx={{ color: "#fff", opacity: 0.9, lineHeight: 1.2 }}
              >
                {user?.city || user?.email || ""}
              </Typography>
            </Box>

            <ArrowDropDownOutlined sx={{ color: "#d82222ff" }} />
          </Button>

          {/* DROPDOWN MENU */}
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
              sx: {
                background: "#364a55ff",
                color: "#dd2828ff",
                borderRadius: 5,
                mt: 1,
                minWidth: 150,
              },
            }}
          >
            <MenuItem
              onClick={logoutHandler}
              sx={{
                gap: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <LogoutOutlined fontSize="small" />
              Log Out
            </MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
