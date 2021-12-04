import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { auth } from "../config/firebase";

function Header({ user }) {
  const signOutUser = async (e) => {
    await auth.signOut().then(() => {
      alert("Sign Out Successfully");
    });
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <div class="header">
      <a class="logo">M. P. GOLD & SILVER TESTING</a>
      <div class="header-right">
        <Button color="inherit" onClick={signOutUser}>
          {user}
        </Button>
      </div>
    </div>
  );
}

export default Header;
