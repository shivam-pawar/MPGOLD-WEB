import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { auth } from "../config/firebase";
import App from "../App";
import Icon from "@material-ui/core/Icon";
import Header from "./Header";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      flexGrow: 2,
      width: "60ch",
    },
    "& > .c-name": {
      margin: theme.spacing(3),
      width: "60ch",
    },
  },
}));

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useLocalStorage("email", "");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [warning, setWarning] = useState("");
  console.log("Logged in with email: ", email);
  const googleSignUp = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).then(
      function (result) {
        var user = result.user;
        setEmail(user.email);
        window.location.reload();
      },
      function (error) {
        var email = error.email;
        setWarning(error.message);
        if (error.code === "auth/account-exists-with-different-credential") {
          auth.fetchSignInMethodsForEmail(email).then(function (providers) {});
        }
      }
    );
  };
  const handleEmailPassword = (e) => {
    const { value } = e.target;
    setCredentials({
      ...credentials,
      [e.target.name]: value,
    });
  };
  return (
    <div className="App">
      {email === "mptunch@gmail.com" ||
      email === "shivampawar1038@gmail.com" ||
      email === "yogeshpawar223@gmail.com" ? (
        <>
          <Header user={email} />
          <App />
        </>
      ) : (
        <>
          <Header />
          <div className="login-main">
            <div className="login-main-img">
              <img
                src={process.env.PUBLIC_URL + "/login-img.jpg"}
                alt="login"
              />
            </div>
            <Paper
              variant="outlined"
              square
              className={classes.root}
              style={{ width: "100%" }}
            >
              <div className="login-inputs">
                <div
                  style={{ display: "block", width: "100%" }}
                  className={classes.root}
                >
                  <TextField
                    className="c-name"
                    id="standard-email"
                    label="Email"
                    name="email"
                    onChange={handleEmailPassword}
                  />
                </div>
                <div
                  style={{ display: "block", width: "100%" }}
                  className={classes.root}
                >
                  <TextField
                    className="c-name"
                    id="standard-password"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleEmailPassword}
                  />
                </div>
              </div>
              <div className={classes.root}>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>login</Icon>}
                  onClick={() =>
                    googleSignUp(credentials.email, credentials.password)
                  }
                >
                  Login
                </Button>

                {warning && <Alert severity="error">{warning}</Alert>}
              </div>
            </Paper>
          </div>
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
