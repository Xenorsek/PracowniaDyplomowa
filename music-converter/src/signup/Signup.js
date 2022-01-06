import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Translation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  field: {
    margin: 5,
    display: "table-cell",
    width:"100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxHeight: 350,
    gap: 5,
  },
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error, setError } = useSignup();
  const [emailLabel, setEmailLabel] = useState("Email");
  const [passwordLabel, setPasswordLabel] = useState("Password");
  const [displayNameLabel, setDisplayNameLabel] = useState("Display name");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (displayName === "" || displayName.length < 5 || displayName == null) {
      setError("displayName can't be empty or less than 5 characters");
    } else {
      signup(email, password, displayName);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Translation>
          {(t, { i18n }) => <h2>{i18n.t("Login2.0.Signup")}</h2>}
        </Translation>
        <br></br>
        <Translation>
          {(t, { i18n }) => (
            <span>{setEmailLabel(i18n.t("Login2.3.Email"))}</span>
          )}
        </Translation>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={classes.field}
          label={emailLabel}
          variant="outlined"
          color="secondary"
        />
        <Translation>
          {(t, { i18n }) => (
            <span>{setPasswordLabel(i18n.t("Login2.2.Password"))}</span>
          )}
        </Translation>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          className={classes.field}
          value={password}
          label={passwordLabel}
          variant="outlined"
          color="secondary"
          type="password"
        />
        <Translation>
          {(t, { i18n }) => (
            <span>{setDisplayNameLabel(i18n.t("Login2.4.DisplayName"))}</span>
          )}
        </Translation>
        <TextField
          type="text"
          className={classes.field}
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
          label={displayNameLabel}
          variant="outlined"
          color="secondary"
        />
        {!isPending && (
          <Button
            className={classes.field}
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
          >
            <Translation>
              {(t, { i18n }) => <>{i18n.t("Login2.0.Signup")}</>}
            </Translation>
          </Button>
        )}
        {isPending && (
          <Button
            className={classes.field}
            color="secondary"
            variant="contained"
            disabled
          >
            loading
          </Button>
        )}
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
