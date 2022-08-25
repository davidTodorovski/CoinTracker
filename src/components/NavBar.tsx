import { AppBar, Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";

import logo from "../assets/logo.png";
import { useUser } from "../context/UserContext/UserContext";

const useStyles = makeStyles((theme?: any) => ({
  logo: {
    height: "40px",
  },
  navbarContainer: {
    padding: "10px",
    display: "flex !important",
    alignItems: "center",
    width: "95%",
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      width: "98%",
    },
  },
  navbarHeading: {
    textTransform: "capitalize",
    marginRight: "auto !important",
    marginLeft: "10px !important",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { userAvatar } = useUser();
  const location = useLocation();
  const { pathname } = location;

  const checkPathname = () => {
    return ["/", "/sign-up", "/welcome"].some((p) => p === pathname);
  };

  if (checkPathname()) {
    return null;
  }

  return (
    <AppBar position="fixed">
      <div className={classes.navbarContainer}>
        <img src={logo} alt="" className={classes.logo} />
        <Typography variant="h6" className={classes.navbarHeading}>
          {pathname.slice(1)}
        </Typography>
        <Avatar
          style={{ width: 45, height: 45 }}
          alt="Profile"
          src={userAvatar}
        />
      </div>
    </AppBar>
  );
};

export default NavBar;
