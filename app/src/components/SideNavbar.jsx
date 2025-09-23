import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  Videocam,
  Person,
  Settings,
  Analytics,
  Business,
} from "@mui/icons-material";

const drawerWidth = 200;

const DrawerStyled = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  height: "100%",
  "& .MuiDrawer-paper": {
    position: "static",
    height: "100%",
    width: drawerWidth,
    background: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderLeft: "none",
    borderTop: "none",
    borderBottom: "none",
    overflowX: "hidden",
    overflowY: "auto",
  },
}));

const SideNavbar = ({ navigate, location, userId }) => {
  const theme = useTheme();
  // Sidebar is always open now
  const open = true;

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "dashboard" },
    { text: "Cameras", icon: <Videocam />, path: "cameras" },
    { text: "Analytics", icon: <Analytics />, path: "analytics" },
    { text: "Facility", icon: <Business />, path: "facility" },
    { text: "Settings", icon: <Settings />, path: "settings" },
    { text: "Profile", icon: <Person />, path: "profile" },
  ];

  const handleNavigation = (path) => {
    if (navigate && userId) {
      navigate(`/dashboard/${userId}/${path}`);
    }
  };

  const isSelected = (path) => {
    return location?.pathname?.includes(path) || false;
  };

  // Drawer content component
  const DrawerContent = () => (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          minHeight: 64,
        }}
      >
        <Box sx={{ 
          color: "white", 
          fontWeight: 600, 
          fontSize: "1.1rem"
        }}>
          Navigation
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ 
        mt: 2, 
        px: 1, 
        flex: 1,
        '& .MuiListItem-root': {
          mb: 1
        }
      }}>
        {menuItems.map((item) => {
          const selected = isSelected(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  color: selected ? "rgba(59, 130, 246, 1)" : "rgba(156, 163, 175, 1)",
                  backgroundColor: selected ? "rgba(59, 130, 246, 0.1)" : "transparent",
                  border: selected ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: selected 
                      ? "rgba(59, 130, 246, 0.15)" 
                      : "rgba(255, 255, 255, 0.05)",
                    color: "white",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    color: "inherit",
                    "& .MuiTypography-root": {
                      fontWeight: selected ? 600 : 400,
                      fontSize: "0.9rem"
                    }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      
      {/* Always Visible Left Sidebar */}
      <DrawerStyled variant="permanent" anchor="left">
        <DrawerContent />
      </DrawerStyled>
    </Box>
  );
};

export default SideNavbar;