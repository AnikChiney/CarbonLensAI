import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Co2,
  Favorite,
  LocalHospital,
  Announcement,
  Newspaper,
  Public,
  LogoutOutlined, // Added Logout Icon
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import { useLogoutMutation } from "state/api"; // Ensure this matches your API state file

const navItems = [
  { text: "Dashboard", route: "dashboard", icon: <HomeOutlined /> },
  { text: "For You", icon: null },
  { text: "Carbon Footprint", route: "carbon-footprint", icon: <Co2 /> },
  { text: "Ecofriendly Tips", route: "ecofriendly-tips", icon: <Favorite /> },
  { text: "WHO Standards", route: "who-standards", icon: <LocalHospital /> },
  { text: "News & Events", icon: null },
  { text: "Top Headlines", route: "top-headlines", icon: <Announcement /> },
  { text: "Local", route: "local-news", icon: <Newspaper /> },
  { text: "Global", route: "global-news", icon: <Public /> },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  // Redux & API
  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user || userInfo;
  const [logout] = useLogoutMutation();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // Clear local storage (ensure key matches your auth logic)
      localStorage.removeItem("userInfoEcoTrack"); 
      navigate("/login");
      window.location.reload(); // Ensure state is fully reset
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: isLight 
                ? theme.palette.background.alt 
                : "linear-gradient(180deg, #0f2027, #203a43)",
            color: theme.palette.text.primary,
            borderRight: isLight 
                ? `1px solid ${theme.palette.grey[100]}` 
                : "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            overflowX: "hidden"
          },
        }}
      >
        <Box px={3} py={3}>
          <FlexBetween>
            <Box display="flex" alignItems="center" gap="0.8rem" sx={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
              <Box
                component="img"
                src="logo.jpg"
                alt="Logo"
                sx={{ width: 42, height: 42, borderRadius: "8px" }}
              />
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color={theme.palette.text.primary}
              >
                CarbonLensAI
              </Typography>
            </Box>

            {!isNonMobile && (
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>
        </Box>

        <Divider sx={{ opacity: isLight ? 0.1 : 0.1 }} />

        {/* Navigation Section */}
        <List sx={{ mt: 2, flexGrow: 1 }}>
          {navItems.map(({ text, route, icon }) => {
            if (!icon) {
              return (
                <Typography
                  key={text}
                  sx={{
                    mt: 3,
                    mb: 1,
                    ml: 3,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "1.2px",
                    color: isLight ? theme.palette.grey[500] : "rgba(255,255,255,0.5)",
                  }}
                >
                  {text.toUpperCase()}
                </Typography>
              );
            }

            const lcText = route;
            const isSelected = active === lcText;

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${route}`);
                    setActive(lcText);
                  }}
                  sx={{
                    mx: 1.5,
                    mb: 0.5,
                    borderRadius: "10px",
                    backgroundColor: isSelected
                        ? (isLight ? theme.palette.primary[100] : "rgba(0, 255, 170, 0.15)")
                        : "transparent",
                    "&:hover": {
                        backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.05)",
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected
                          ? (isLight ? theme.palette.primary.main : "#00ffaa")
                          : (isLight ? theme.palette.grey[600] : "rgba(255,255,255,0.7)"),
                      minWidth: "35px",
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      fontWeight: isSelected ? 600 : 400,
                      color: isSelected && isLight ? theme.palette.primary.main : "inherit"
                    }}
                  />

                  {isSelected && (
                    <ChevronRightOutlined
                      sx={{ 
                        color: isLight ? theme.palette.primary.main : "#00ffaa", 
                        fontSize: "18px" 
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* User Profile & Logout Section */}
        <Box px={2} pb={3}>
          <Box 
            p="0.8rem"
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
            sx={{
                backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                border: isLight ? "1px solid #eee" : "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <Box display="flex" alignItems="center" gap="0.8rem">
                <Box
                    component="img"
                    src="profile.png"
                    alt="profile"
                    sx={{ 
                        width: 38, 
                        height: 38, 
                        borderRadius: "50%", 
                        border: `2px solid ${isLight ? theme.palette.primary.main : "#00ffaa"}` 
                    }}
                />
                <Box>
                <Typography fontWeight="bold" fontSize="0.8rem">
                    {user?.fname || user?.name || "User"}
                </Typography>
                <Typography fontSize="0.7rem" sx={{ opacity: 0.6 }}>
                    {user?.city || "West Bengal"}
                </Typography>
                </Box>
            </Box>
            
            <Tooltip title="Logout" arrow>
                <IconButton 
                    onClick={handleLogout}
                    sx={{ 
                        color: isLight ? theme.palette.error.main : "#ff4d4d",
                        "&:hover": { backgroundColor: "rgba(255, 77, 77, 0.1)" }
                    }}
                >
                    <LogoutOutlined fontSize="small" />
                </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;