import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { auth } from "../config/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function Header({ user }) {
  const classes = useStyles();
  const signOutUser = async (e) => {
    await auth.signOut().then(() => {
      alert("Sign Out Successfully");
    });
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            M. P. GOLD & SILVER TESTING
          </Typography>
          <Button color="inherit" onClick={signOutUser}>
            {user}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
