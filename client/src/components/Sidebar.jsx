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
  useTheme, // Added this
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  //WaterDrop,
  Co2,
  Favorite,
  LocalHospital,
  Announcement,
  Newspaper,
  Public,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";

const navItems = [
  { text: "Dashboard", route: "dashboard", icon: <HomeOutlined /> },
  { text: "For You", icon: null },
  { text: "Carbon Footprint", route: "carbon-footprint", icon: <Co2 /> },
  // { text: "Water Usage", route: "water-usage", icon: <WaterDrop /> },
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
  const theme = useTheme(); // 🔥 Use the theme hook
  const isLight = theme.palette.mode === "light";

  const { userInfo } = useSelector((state) => state.auth);
  const user = userInfo?.user || userInfo;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

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
            // 🔥 Dynamically switch background based on mode
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
          },
        }}
      >
        <Box px={3} py={3}>
          <FlexBetween>
            <Box display="flex" alignItems="center" gap="0.8rem">
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
                    // 🔥 Dynamic pill background
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

        <Box px={2} pb={3}>
          <Box 
            p="1rem"
            display="flex" 
            alignItems="center" 
            gap="1rem"
            sx={{
                backgroundColor: isLight ? theme.palette.grey[50] : "rgba(255,255,255,0.03)",
                borderRadius: "12px",
            }}
          >
            <Box
              component="img"
              src="profile.png"
              alt="profile"
              sx={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${theme.palette.primary.main}` }}
            />
            <Box>
              <Typography fontWeight="bold" fontSize="0.85rem">
                {user?.fname || user?.name || "User"}
              </Typography>
              <Typography fontSize="0.75rem" sx={{ opacity: 0.6 }}>
                {user?.city || "West Bengal"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;