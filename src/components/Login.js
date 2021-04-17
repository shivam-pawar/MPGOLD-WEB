import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { auth, provider } from "../config/firebase";
import App from "../App";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";

function Login() {
  const [email, setEmail] = useLocalStorage("email", "");
  console.log("Logged in with email: ", email);
  const googleSignUp = () => {
    auth.signInWithPopup(provider).then(
      function (result) {
        var user = result.user;
        setEmail(user.email);
        window.location.reload();
      },
      function (error) {
        var email = error.email;

        if (error.code === "auth/account-exists-with-different-credential") {
          auth.fetchSignInMethodsForEmail(email).then(function (providers) {});
        }
      }
    );
  };
  return (
    <div className="App">
      {email === "mptunch@gmail.com" ||
      email === "shivampawar1038@gmail.com" ||
      email === "yogeshpawar223@gmail.com" ? (
        <>
          <App />
        </>
      ) : (
        <>
          <Container maxWidth="sm" style={{ width: "1x" }}>
            <img src={process.env.PUBLIC_URL + "/login-img.jpg"} alt="login" />
            <Grid container justify="center" style={{ marginTop: "-100px" }}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                endIcon={<Icon>login</Icon>}
                onClick={googleSignUp}
              >
                Login With Google
              </Button>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default Login;
