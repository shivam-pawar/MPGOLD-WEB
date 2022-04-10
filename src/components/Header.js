import React from "react";
import { Button } from "@material-ui/core";
import { auth } from "../config/firebase";

function Header({ user }) {
  var url = "";
  const signOutUser = async (e) => {
    await auth.signOut().then(() => {
      alert("Sign Out Successfully");
    });
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
    <div class="header">
      <a href={url} class="logo">
        M. P. GOLD & SILVER TESTING
        {process.env.NODE_ENV === "development" && <span> (development)</span>}
      </a>
      <div class="header-right">
        <Button color="inherit" onClick={signOutUser}>
          {user}
        </Button>
      </div>
    </div>
  );
}

export default Header;
