import React, { useState } from "react";
import { useLogin } from "../hooks/useLogIn";
import { useResetPassword } from "../hooks/useResetPassword";
import { Translation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  field: {
    margin: 5,
    display: "table-cell",
    width:"50%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxHeight: 300,
    gap: 6,
    alignItems: "center",
    justifyContent:"center"
  },
  button: {
    display: "block",
    marginTop: 5,
  },
});
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();
  const [emailToResetPassword, setEmailToResetPassword] = useState("");
  const [ResetPassword, setResetPassword] = useState(false);
  const { resetPassword, message } = useResetPassword();
  const [emailLabel, setEmailLabel] = useState("Email");
  const [passwordLabel, setPasswordLabel] = useState("Password");

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleShowResetPassword = (e) => {
    setResetPassword(!ResetPassword);
  };
  const handleSubmitResetPassword = (e) => {
    e.preventDefault();
    resetPassword(emailToResetPassword);
  };
  return (
    <>
      {!ResetPassword && (
        <>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Translation>
              {(t, { i18n }) => <h2>{i18n.t("Login2.1.Login")}</h2>}
            </Translation>
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
            {!isPending && (
              <Button
                className={classes.field}
                onClick={handleSubmit}
                color="secondary"
                variant="contained"
              >
                <Translation>
                  {(t, { i18n }) => <>{i18n.t("Login2.1.Login")}</>}
                </Translation>
              </Button>
            )}
            {isPending && (
              <Button className={classes.field} disabled>
                loading
              </Button>
            )}
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleShowResetPassword}
              className={classes.field}
            >
              <Translation>
                {(t, { i18n }) => <>{i18n.t("Login2.5.ResetPassword")}</>}
              </Translation>
            </Button>
            {error && <p>{error}</p>}
          </form>
        </>
      )}
      {ResetPassword && (
        <>
          <form onSubmit={handleSubmitResetPassword} className={classes.form}>
            <Translation>
              {(t, { i18n }) => <h2>{i18n.t("Login2.6.WriteYourEmail")}</h2>}
            </Translation>
            <TextField
              onChange={(e) => setEmailToResetPassword(e.target.value)}
              value={emailToResetPassword}
              className={classes.field}
              label={emailLabel}
              variant="outlined"
              color="secondary"
            />
            {message === "Email sent!" && (
              <Button disabled className={classes.field}>
                <Translation>
                  {(t, { i18n }) => <>{i18n.t("Login2.7.Done")}</>}
                </Translation>
              </Button>
            )}
            {(!message || message !== "Email sent!") && (
              <Button
                className={classes.field}
                color="secondary"
                variant="contained"
                onClick={handleSubmitResetPassword}
              >
                <Translation>
                  {(t, { i18n }) => <>{i18n.t("Login2.8.RecoverPassword")}</>}
                </Translation>
              </Button>
            )}
            <Button
              className={classes.field}
              color="secondary"
              variant="outlined"
              onClick={handleShowResetPassword}
            >
              <Translation>
                {(t, { i18n }) => <>{i18n.t("Login2.1.Login")}</>}
              </Translation>
            </Button>
            {message && <p>{message}</p>}
          </form>
        </>
      )}
    </>
  );
}
