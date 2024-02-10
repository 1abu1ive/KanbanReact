import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Switch } from "@mui/material";
import { Label } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, darkMode }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(() => {
    const storedValue = localStorage.getItem("isDrawerOpen");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [darkMode, setDarkMode] = useState(() => {
    const storedValue = localStorage.getItem("isDarkMode");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [activeItem, setActiveItem] = useState(0);

  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignOut = () => {
    localStorage.clear(); // Barcha LocalStorage ma'lumotlarini o'chirish
    window.location.href = "/"; // Login sahifasiga o'tish
  };

  const handleItemClick = (index, page) => {
    setActiveItem(index);
    localStorage.setItem("currentPage", page);
  };

  useEffect(() => {
    const currentPage = localStorage.getItem("currentPage");
    const activeItemIndex = currentPage
      ? [
          { text: "Platform Launch", page: "/" },
          { text: "Marketing Plan", page: "/marketing" },
          { text: "Roadmap", page: "/roadmap" },
          { text: "+ Create New Board", page: "/board" },
        ].findIndex((item) => item.page === currentPage)
      : 0;
    setActiveItem(activeItemIndex);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("isDrawerOpen", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: darkMode ? "#2B2C37" : "inherit",
        color: darkMode ? "#ffff" : "black",
        height: "100vh",
      }}
    >
      <AppBar
        position="fixed"
        open={open}
        sx={{
          bgcolor: darkMode ? "#2B2C37" : "inherit",
          color: darkMode ? "#ffff" : "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: darkMode ? "#ffff" : "black",
              mr: 2,
              ...(open && { display: "none" }),
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Kanban
          </Typography>
          <Box sx={{ flexGrow: 1 }} />{" "}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: darkMode ? "#2B2C37" : "inherit",
            color: darkMode ? "#ffff" : "black",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: darkMode ? "#ffff" : "black" }}
          >
            {theme.direction === "ltr" ? (
              <VisibilityOffIcon />
            ) : (
              <RemoveRedEyeIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <List>
          {[
            { text: "Platform Launch", page: "/task" },
            { text: "Marketing Plan", page: "/marketing" },
            { text: "Roadmap", page: "/roadmap" },
            { text: "+ Create New Board", page: "/board" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                key={item.text}
                disablePadding
                component={Link}
                to={item.page}
                onClick={() => handleItemClick(index, item.page)}
                sx={{
                  borderTopRightRadius: "100px",
                  borderBottomRightRadius: "100px",
                  backgroundColor: index === activeItem ? "#635FC7" : "inherit",
                  color: index === activeItem ? "#ffff" : "inherit",
                  "&:hover": {
                    borderTopRightRadius: "100px",
                    borderBottomRightRadius: "100px",
                    backgroundColor:
                      index === activeItem ? "#635FC7" : "inherit",
                    color: index === activeItem ? "#ffff" : "inherit",
                  },
                }}
              >
                <ListItemIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    style={{
                      color:
                        index === activeItem
                          ? "#ffff"
                          : darkMode
                          ? "#fff"
                          : "#000",
                    }}
                  >
                    <path
                      fill="currentColor"
                      d="M6.25 3A3.25 3.25 0 0 0 3 6.25V11h11V3zM3 17.75V12.5h11V21H6.25A3.25 3.25 0 0 1 3 17.75M15.5 16v5h2.25A3.25 3.25 0 0 0 21 17.75V16zm5.5-1.5v-5h-5.5v5zM21 8h-5.5V3h2.25A3.25 3.25 0 0 1 21 6.25z"
                    />
                  </svg>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              height: "48px",
              marginTop: "350px",
              paddingLeft: "50px",
            }}
          >
            <WbSunnyIcon />
            <Switch {...Label} onClick={toggleDarkMode} />
            <Brightness3Icon />
          </Box>
        </List>
      </Drawer>

      <Main open={open} sx={{ paddingTop: "100px", height: "100h" }}>
        {children}
      </Main>
      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        variant="contained"
        color="secondary"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
}
