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
  IconButton,
} from "@mui/material";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Mail,
  MoveToInbox,
} from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import GridViewIcon from "@mui/icons-material/GridView";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useState } from "react";

const drawerWidth = 240;

const OpenedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const ClosedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `60px`, // collapsed width (just icons)
});

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    top: "100px", // 👈 push below navbar
  },
  ...(open && {
    ...OpenedMixin(theme),
    "& .MuiDrawer-paper": {
      ...OpenedMixin(theme),
      top: "90px",
    },
  }),
  ...(!open && {
    ...ClosedMixin(theme),
    "& .MuiDrawer-paper": {
      ...ClosedMixin(theme),
      top: "90px",
    },
  }),
}));

const SideNavbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const { user } = useUser();
  const userId = user ? user.id : null;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar */}
      <DrawerStyled
        variant="permanent"
        open={open}
        anchor="right" // <-- Add this line
        PaperProps={{
          className: "gradient-bg",
          sx: {
            color: "#22cc9cff",
            borderLeft: "none", // Use borderLeft for right sidebar
            borderRight: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // <-- Changed from "flex-end" to "flex-start"
            p: 1,
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronRight /> : <Menu />}
          </IconButton>
        </Box>

        <List>
          {["Dashboard", "Cameras", "Drafts", "Spam", "Profile"].map(
            (text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    setSelectedIndex(text);
                    navigate(`dashboard/${userId}/${text}`);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "#0879ebff",
                    }}
                  >
                    {text === "Profile" ? (
                      <AccountCircleOutlinedIcon />
                    ) : text === "Dashboard" ? (
                      <GridViewIcon />
                    ) : text === "Cameras" ? (
                      <VideoCameraFrontIcon />
                    ) : (
                      <Mail />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </DrawerStyled>
    </Box>
  );
};

export default SideNavbar;
