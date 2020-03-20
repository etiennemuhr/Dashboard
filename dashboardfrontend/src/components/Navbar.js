import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import AuthContext from "../context/auth/authContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  const handleLogout = () => {
    logout();
  };

  const [selectedIndex, setSelectedIndex] = useState("1");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (props.location.pathname === "/home") {
      setSelectedIndex("1");
    } else if (
      props.location.pathname === "/customers" ||
      props.location.pathname === "/addcustomer" ||
      props.location.pathname.startsWith("/customer")
    ) {
      setSelectedIndex("2");
    } else if (
      props.location.pathname === "/receipts" ||
      props.location.pathname === "/addReceipt" ||
      props.location.pathname.startsWith("/receipts")
    ) {
      setSelectedIndex("3");
    } else if (
      props.location.pathname === "/server" ||
      props.location.pathname.startsWith("/server")
    ) {
      setSelectedIndex("6");
    }
  }, [props.location.pathname]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            { id: "1", text: "Home", icon: "home", linkTo: "/home" },
            {
              id: "2",
              text: "Kunden",
              icon: "person",
              linkTo: "/customers"
            },
            {
              id: "3",
              text: "Rechnungen",
              icon: "receipt",
              linkTo: "/receipts"
            }
            // { id: "6", text: "Server", icon: "storage", linkTo: "/server" }
          ].map((item, index) => (
            <NavLink
              to={item.linkTo}
              style={{ textDecoration: "none", color: "inherit" }}
              key={item.id}
            >
              <ListItem
                button
                selected={selectedIndex === item.id}
                onClick={event => handleListItemClick(event, item.id)}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            onClick={handleLogout}
            selected={selectedIndex === "4"}
          >
            <ListItemIcon>
              <Icon>
                <ExitToApp />
              </Icon>
            </ListItemIcon>
            <ListItemText primary={"Abmelden"} />
          </ListItem>
          {[
            {
              id: "5",
              text: "Einstellungen",
              icon: "settings",
              linkTo: "/settings"
            }
            // {
            //   id: "2",
            //   text: "Working Page",
            //   icon: "star",
            //   linkTo: "/workingPage"
            // }
          ].map((item, index) => (
            <NavLink
              to={item.linkTo}
              style={{ textDecoration: "none", color: "inherit" }}
              key={item.id}
            >
              <ListItem
                button
                selected={selectedIndex === item.id}
                onClick={event => handleListItemClick(event, item.id)}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
