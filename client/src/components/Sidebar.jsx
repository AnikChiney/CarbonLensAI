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
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  WaterDrop,
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
  { text: "Water Usage", route: "water-usage", icon: <WaterDrop /> },
  { text: "Ecofriendly Tips", route: "ecofriendly-tips", icon: <Favorite /> },
  { text: "WHO Standards", route: "who-standards", icon: <LocalHospital /> },

  { text: "News & Events", icon: null },

  { text: "Top Headlines", route: "top-headlines", icon: <Announcement /> },
  { text: "Local", route: "local-news", icon: <Newspaper /> },
  { text: "Global", route: "global-news", icon: <Public /> },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  // ✅ USE REDUX INSTEAD OF API
  const { userInfo } = useSelector((state) => state.auth);

  // handle both possible structures
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
            background: "linear-gradient(180deg, #0f2027, #203a43)",
            color: "#fff",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* LOGO */}
        <Box px={3} py={3}>
          <FlexBetween>
            <Box display="flex" alignItems="center" gap="0.8rem">
              <Box
                component="img"
                src="logo.jpg"
                alt="CarbonLensAI Logo"
                sx={{ width: 42, height: 42 }}
              />
              <Typography variant="h5" fontWeight="bold">
                CarbonLensAI
              </Typography>
            </Box>

            {!isNonMobile && (
              <IconButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                sx={{ color: "#fff" }}
              >
                <ChevronLeft />
              </IconButton>
            )}
          </FlexBetween>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {/* NAVIGATION */}
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
                    fontSize: "0.75rem",
                    letterSpacing: 2,
                    opacity: 0.6,
                  }}
                >
                  {text.toUpperCase()}
                </Typography>
              );
            }

            const lcText = route;

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${route}`);
                    setActive(lcText);
                  }}
                  sx={{
                    mx: 2,
                    mb: 0.5,
                    borderRadius: 2,
                    backgroundColor:
                      active === lcText
                        ? "rgba(0, 255, 170, 0.15)"
                        : "transparent",
                      borderLeft:
                        active === lcText
                          ? "4px solid #00ffaa"
                          : "4px solid transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        active === lcText
                          ? "#00ffaa"
                          : "rgba(255,255,255,0.7)",
                      minWidth: "40px",
                    }}
                  >
                    {icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "0.95rem",
                      fontWeight: active === lcText ? "bold" : 400,
                    }}
                  />

                  {active === lcText && (
                    <ChevronRightOutlined
                      sx={{ color: "#00ffaa", fontSize: "20px" }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* USER SECTION */}
        <Box px={3} pb={3}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

          <Box display="flex" alignItems="center" gap="1rem">
            <Box
              component="img"
              src="profile.png"
              alt="profile"
              sx={{
                width: 45,
                height: 45,
                borderRadius: "50%",
              }}
            />

            <Box>
              <Typography fontWeight="bold" fontSize="0.9rem">
                {user?.fname || user?.name || "User"}
              </Typography>
              <Typography fontSize="0.8rem" sx={{ opacity: 0.7 }}>
                {user?.city || user?.email || ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
