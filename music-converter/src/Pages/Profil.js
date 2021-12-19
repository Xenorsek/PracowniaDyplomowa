import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

const useStyles = makeStyles({
  field: {
    margin: 5,
    display: "table-cell",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 300,
    gap: 5,
    marginTop: 7,
  },
});

export default function Profil() {
  const { user } = useAuthContext();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [isPending, setPending] = useState();
  const [error, setError] = useState();
  const [isCancelled, setIsCancelled] = useState(false);
  const [emailLabel, setEmailLabel] = useState("Email");
  const [passwordLabel, setPasswordLabel] = useState("Password");
  const [displayNameLabel, setDisplayNameLabel] = useState("Display name");

  const classes = useStyles();

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setPending(true);
    if (user.email !== email) {
      try {
        user
          .updateEmail(email)
          .then(() => {
            console.log("Update email successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setPending(false);
        }
      }
    } else {
      console.log("new email can't be previous email");
      setPending(false);
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    setPending(true);
    if (user.password !== password) {
      try {
        user
          .updatePassword(password)
          .then(() => {
            console.log("Update password successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      } catch (err) {
        if (!isCancelled) {
          console.log(err.message);
          setError(err.message);
          setPending(false);
        }
      }
    } else {
      console.log("new password can't be previous password");
      setPending(false);
    }
  };
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    setPending(true);
    try {
      if (displayName !== user.displayName) {
        user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            console.log("Update displayName successful");
            setPending(false);
          })
          .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setPending(false);
          });
      }
      else{
        console.log("New Display name can't be previous display name");
        setError("New Display name can't be previous display name");
        setPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  return (
    <>
      <h2>Profil</h2>
      <form onSubmit={handleSubmitEmail} className={classes.form}>
        <TextField
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          label={emailLabel}
          className={classes.field}
          variant="outlined"
          color="secondary"
        />
        {!isPending && (
          <Button
            onClick={handleSubmitEmail}
            color="secondary"
            variant="outlined"
            className={classes.field}
          >
            change email
          </Button>
        )}
        {isPending && (
          <Button
            color="secondary"
            variant="outlined"
            className={classes.field}
            disabled
          >
            loading
          </Button>
        )}
      </form>
      <form onSubmit={handleSubmitPassword} className={classes.form}>
        <TextField
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          label={passwordLabel}
          color="secondary"
          variant="outlined"
        />
        {!isPending && (
          <Button
            color="secondary"
            variant="outlined"
            className={classes.field}
            onClick={handleSubmitPassword}
          >
            change password
          </Button>
        )}
        {isPending && (
          <Button
            color="secondary"
            variant="outlined"
            className={classes.field}
            disabled
          >
            loading
          </Button>
        )}
      </form>
      <form onSubmit={handleSubmitProfile} className={classes.form}>
        <TextField
          type="text"
          label={displayNameLabel}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          value={displayName}
          color="secondary"
          variant="outlined"
        />
        {!isPending && (
          <Button
            color="secondary"
            variant="outlined"
            className={classes.field}
            onClick={handleSubmitProfile}
          >
            change name{" "}
          </Button>
        )}
        {isPending && (
          <Button
            className={classes.field}
            color="secondary"
            variant="outlined"
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
